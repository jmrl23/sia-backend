import { Module } from '@nestjs/common';
import { LuponController } from './lupon.controller';
import { LuponService } from './lupon.service';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Module({
  controllers: [LuponController],
  providers: [LuponService, PrismaService],
})
export class LuponModule {}
