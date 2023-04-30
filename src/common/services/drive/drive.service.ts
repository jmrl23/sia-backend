import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { lookup } from 'mime-types';
import { createReadStream, existsSync, statSync } from 'fs';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DriveService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  getDrive() {
    const oauth2Client = new google.auth.OAuth2(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
      this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
      this.configService.get<string>('GOOGLE_PLAYGROUND_URL'),
    );

    oauth2Client.setCredentials({
      refresh_token: this.configService.get<string>('GOOGLE_REFRESH_TOKEN'),
    });

    const drive = google.drive({
      version: 'v3',
      auth: oauth2Client,
    });

    return drive;
  }

  async create(path: string, name: string) {
    if (!existsSync(path)) {
      throw new NotFoundException('File not found');
    }

    const mimeType = lookup(name) || 'application/octet-stream';
    const drive = this.getDrive();
    const response = await drive.files.create({
      media: {
        mimeType,
        body: createReadStream(path),
      },
      requestBody: {
        mimeType,
        name: `${new Date().toJSON()}-${randomUUID()}-${name}`,
        parents: [this.configService.get<string>('DRIVE_FOLDER_ID')],
      },
    });

    if (response.status < 200 || response.status > 399) {
      throw new BadRequestException(response.statusText);
    }

    const data = response.data;
    const file = await this.prismaService.file.create({
      data: {
        fileId: data.id,
        name,
        mimeType,
        size: statSync(path).size,
      },
    });

    return file;
  }

  async getFileStream(fileId: string) {
    const drive = this.getDrive();
    const stream = await drive.files.get(
      {
        fileId: fileId,
        alt: 'media',
      },
      {
        responseType: 'stream',
      },
    );
    if (stream.status > 399) {
      throw new InternalServerErrorException('An error occurs');
    }
    return stream.data;
  }
}
