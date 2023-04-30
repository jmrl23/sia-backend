import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { JWTService } from 'src/common/services/jwt/jwt.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JWTService],
})
export class UserModule {}
