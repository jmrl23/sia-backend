import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { JWTService } from 'src/common/services/jwt/jwt.service';
import { GmailService } from 'src/common/services/gmail/gmail.service';
import { EJSService } from 'src/common/services/ejs/ejs.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JWTService, GmailService, EJSService],
})
export class UserModule {}
