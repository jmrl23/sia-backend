import { Injectable } from '@nestjs/common';
import { LuponCaseCreateDto, LuponCaseUpdateDto } from './dto';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import type { Request } from 'express';

@Injectable()
export class LuponService {
  constructor(private readonly prismaService: PrismaService) {}

  async caseCreate(request: Request, payload: LuponCaseCreateDto) {
    const result = await this.prismaService.luponCase.create({
      data: {
        title: payload.title,
        complaintNature: payload.complaintNature,
        statusOfCompliance: payload.statusOfCompliance,
        dateOfInitial: payload.dateOfInitial,
        dateOfSettled: payload.dateOfSettled,
        remarks: payload.remarks,
        mainPointOfAgreement: payload.mainPointOfAgreement,
        evidenceFileId: payload.evidenceFileId,
        status: 'PENDING',
        userId: request.user.id,
      },
    });

    return {
      case: result,
    };
  }

  async caseUpdate(id: string, payload: LuponCaseUpdateDto) {
    const result = await this.prismaService.luponCase.update({
      where: {
        id,
      },
      data: {
        status: payload.status,
      },
    });

    return {
      case: result,
    };
  }
}
