import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { DriveService } from 'src/common/services/drive/drive.service';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { tmpdir } from 'os';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: tmpdir(),
        limits: {
          fileSize: 1024 * 1000 * 16,
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [DriveService, PrismaService, FileService],
})
export class FileModule {}
