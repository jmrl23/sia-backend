import { Body, Controller, Post, Req, SetMetadata } from '@nestjs/common';
import {
  ClearanceCreateDto,
  ClearanceFetchDto,
  ClearanceListDto,
  ClearanceUpdateDto,
} from './dto';
import { ClearanceService } from './clearance.service';
import type { Request } from 'express';
import { Role } from '@prisma/client';

@Controller('clearance')
export class ClearanceController {
  constructor(private readonly clearanceService: ClearanceService) {}

  @SetMetadata('roles', [Role.ADMIN, Role.RESIDENT])
  @Post('create')
  create(@Req() request: Request, @Body() payload: ClearanceCreateDto) {
    return this.clearanceService.create(request, payload);
  }

  @SetMetadata('roles', [Role.ADMIN])
  @Post('list')
  list(@Body() payload: ClearanceListDto) {
    return this.clearanceService.getList(payload);
  }

  @SetMetadata('roles', [Role.ADMIN, Role.RESIDENT])
  @Post('fetch')
  fetch(@Body() payload: ClearanceFetchDto) {
    return this.clearanceService.fetch(payload);
  }

  @SetMetadata('roles', [Role.ADMIN])
  @Post('update')
  update(@Body() payload: ClearanceUpdateDto) {
    return this.clearanceService.update(payload);
  }
}
