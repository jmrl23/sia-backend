import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { File } from '@prisma/client';
import { DriveService } from 'src/common/services/drive/drive.service';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { validate } from 'uuid';

@Injectable()
export class FileService {
  constructor(
    private readonly driveService: DriveService,
    private readonly prismaService: PrismaService,
  ) {}

  async upload(files: Express.Multer.File[]) {
    const uploads = await Promise.allSettled(
      files.map((file) =>
        this.driveService.create(file.path, file.originalname),
      ),
    );
    const result = uploads
      .filter((promise) => promise.status === 'fulfilled')
      .map((promise: PromiseFulfilledResult<File>) => promise.value);

    return {
      files: result,
    };
  }

  async getFile(id: string, name: string) {
    if (!validate(id)) throw new BadRequestException('Invalid file id');

    const file = await this.prismaService.file.findFirst({
      where: {
        id,
        name,
      },
    });

    if (!file) throw new NotFoundException('File not found');

    const stream = await this.driveService.getFileStream(file.fileId);
    return {
      file,
      stream,
    };
  }
}
