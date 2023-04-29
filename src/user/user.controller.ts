import {
  Controller,
  Get,
  NotImplementedException,
  Post,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('session')
  getSession(@Req() request: Request) {
    return {
      user: this.userService.getSession(request.user),
    };
  }

  @Post('sign-in')
  signIn() {
    throw new NotImplementedException('Not available');
  }
}
