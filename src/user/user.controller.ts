import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  SetMetadata,
  Param,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import {
  UserCreateDto,
  UserFetchDto,
  UserListDto,
  UserResetPasswordDto,
  UserSignInDto,
  UserUpdateDto,
} from './dto';
import { Role } from '@prisma/client';
import { Throttle } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get('session')
  getSession(@Req() request: Request) {
    return {
      user: this.userService.getSession(request.user),
    };
  }

  @Get('reset-password/:id/:code')
  async resetPassword(
    @Param('id') id: string,
    @Param('code') code: string,
    @Res() response: Response,
  ) {
    const { token } = await this.userService.resetPassword(id, code);
    if (!token) throw new BadRequestException('Invalid request');
    const CLIENT_URL = this.configService.get<string>('CLIENT_URL');
    response.redirect(`${CLIENT_URL}/sign-in?token=${token}`);
  }

  @Post('create')
  async create(@Body() userCreateDto: UserCreateDto) {
    const result = await this.userService.createUser(userCreateDto);
    return result;
  }

  @SetMetadata('roles', [Role.ADMIN, Role.RESIDENT])
  @Post('fetch')
  async getData(@Body() payload: UserFetchDto) {
    const result = await this.userService.getData(payload);
    return result;
  }

  @Throttle(5, 60)
  @Post('sign-in')
  async signIn(@Body() userSignInDto: UserSignInDto) {
    const result = await this.userService.signIn(userSignInDto);
    return result;
  }

  @SetMetadata('roles', [Role.ADMIN, Role.RESIDENT])
  @Post('update')
  async update(@Req() request: Request, @Body() userUpdateDto: UserUpdateDto) {
    const result = await this.userService.update(request.user, userUpdateDto);
    return result;
  }

  @Throttle(3, 60 * 5)
  @Post('reset-password')
  async requestResetPassword(
    @Body() userResetPasswordDto: UserResetPasswordDto,
  ) {
    const result = await this.userService.requestResetPassword(
      userResetPasswordDto,
    );
    return result;
  }

  @SetMetadata('roles', [Role.ADMIN, Role.RESIDENT])
  @Post('list')
  async list(@Body() userListDto: UserListDto) {
    const result = await this.userService.getList(userListDto);
    return result;
  }
}
