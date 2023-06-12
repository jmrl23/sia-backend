import { Body, Controller, Post, Req, SetMetadata } from '@nestjs/common';
import { LuponService } from './lupon.service';
import type { Request } from 'express';
import { Role } from '@prisma/client';
import {
  LuponCaseCreateDto,
  LuponCaseFetchDto,
  LuponCaseListDto,
  LuponCaseUpdateDto,
} from './dto';

@Controller('lupon')
export class LuponController {
  constructor(private readonly luponService: LuponService) {}

  @SetMetadata('roles', [Role.ADMIN, Role.RESIDENT])
  @Post('case-create')
  caseCreate(@Req() request: Request, @Body() payload: LuponCaseCreateDto) {
    return this.luponService.caseCreate(request, payload);
  }

  @SetMetadata('roles', [Role.ADMIN, Role.RESIDENT])
  @Post('case-list')
  caseList(@Req() request: Request, @Body() payload: LuponCaseListDto) {
    return this.luponService.caseList(request, payload);
  }

  @SetMetadata('roles', [Role.ADMIN, Role.RESIDENT])
  @Post('case-fetch')
  caseFetch(@Body() payload: LuponCaseFetchDto) {
    return this.luponService.caseFetch(payload);
  }

  @SetMetadata('roles', [Role.ADMIN, Role.RESIDENT])
  @Post('case-update')
  caseUpdate(@Body() payload: LuponCaseUpdateDto) {
    return this.luponService.caseUpdate(payload);
  }
}
