import { Body, Controller, Post, Req, SetMetadata } from '@nestjs/common';
import { LuponService } from './lupon.service';
import { LuponCaseCreateDto } from './dto/lupon-case-create.dto';
import type { Request } from 'express';
import { Role } from '@prisma/client';
import { LuponCaseUpdateDto } from './dto';

@Controller('lupon')
export class LuponController {
  constructor(private readonly luponService: LuponService) {}

  @SetMetadata('roles', [Role.ADMIN, Role.RESIDENT])
  @Post('case-create')
  caseCreate(@Req() request: Request, @Body() payload: LuponCaseCreateDto) {
    return this.luponService.caseCreate(request, payload);
  }

  @SetMetadata('roles', [Role.ADMIN])
  @Post('case-update')
  caseUpdate(@Body() payload: LuponCaseUpdateDto) {
    return this.luponService.caseUpdate(payload);
  }
}
