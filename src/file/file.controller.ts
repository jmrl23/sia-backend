import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import type { Response } from 'express';
import { Roles } from 'src/common/decorators';
import { Role } from '@prisma/client';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('get/:id/:name')
  @Header('Cache-Control', 'max-age=3600')
  async getFile(
    @Param('id') id: string,
    @Param('name') name: string,
    @Res() response: Response,
  ) {
    const { file, stream } = await this.fileService.getFile(id, name);

    response.setHeader('Content-Length', file.size);
    response.setHeader('Content-Type', file.mimeType);
    stream.pipe(response);
  }

  @Post('upload')
  @Roles(Role.ADMIN, Role.RESIDENT)
  @UseInterceptors(FilesInterceptor('file'))
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    const result = await this.fileService.upload(files);
    return result;
  }
}
