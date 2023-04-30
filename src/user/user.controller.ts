import { Controller, Get, Post, Req, Body, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import {
  UserCreateDto,
  UserListDto,
  UserSignInDto,
  UserUpdateDto,
} from './dto';
import { Role } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get('session')
  getSession(@Req() request: Request) {
    return {
      user: this.userService.getSession(request.user),
    };
  }

  @Post('create')
  async create(@Body() userCreateDto: UserCreateDto) {
    const result = await this.userService.createUser(userCreateDto);
    return result;
  }

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

  @SetMetadata('roles', [Role.ADMIN, Role.RESIDENT])
  @Post('list')
  async list(@Body() userListDto: UserListDto) {
    const result = await this.userService.getList(userListDto);
    return result;
  }
}
