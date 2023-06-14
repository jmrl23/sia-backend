import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { LuponCaseCreateDto, LuponCaseFetchDto, LuponCaseListDto } from './dto';
import type { Request } from 'express';
import { Role } from '@prisma/client';
import { LuponCaseUpdateDto } from './dto/lupon-case-update.dto';

@Injectable()
export class LuponService {
  constructor(private readonly prismaService: PrismaService) {}

  async caseCreate(request: Request, payload: LuponCaseCreateDto) {
    const result = await this.prismaService.luponCase.create({
      data: {
        title: payload.title,
        respondentName: payload.respondentName,
        dateFiled: payload.dateFiled,
        dateOfConfrontation: payload.dateOfConfrontation,
        dateOfSettled: payload.dateOfSettled,
        remarks: payload.remarks,
        mainPointOfAgreement: payload.mainPointOfAgreement,
        actionTaken: payload.actionTaken,
        evidenceFileId: payload.evidenceFileId,
        userId: request.user.id,
      },
      include: {
        evidenceFile: true,
        User: {
          include: {
            UserInformation: {
              include: {
                Picture: true,
              },
            },
          },
        },
      },
    });

    return {
      case: result,
    };
  }

  async caseList(request: Request, payload: LuponCaseListDto) {
    const result = await this.prismaService.luponCase.findMany({
      where: {
        title: {
          contains: payload.title,
        },
        dateFiled: payload.dateFiled,
        dateOfConfrontation: payload.dateOfConfrontation,
        dateOfSettled: payload.dateOfSettled,
        remarks: {
          contains: payload.remarks,
        },
        mainPointOfAgreement: {
          contains: payload.mainPointOfAgreement,
        },
        actionTaken: payload.actionTaken,
        evidenceFileId: payload.evidenceFileId,
        userId: request.user.role === Role.ADMIN ? void 0 : request.user.id,
        dateCreated: {
          gte: payload.dateCreatedFrom,
          lte: payload.dateCreatedTo,
        },
        dateUpdated: {
          gte: payload.dateUpdatedFrom,
          lte: payload.dateUpdatedTo,
        },
      },
      include: {
        evidenceFile: true,
        User: {
          include: {
            UserInformation: {
              include: {
                Picture: true,
              },
            },
          },
        },
      },
      orderBy: {
        dateCreated: payload.orderBy ?? 'desc',
      },
      take: payload.take,
      skip: payload.skip,
    });

    return {
      cases: result,
    };
  }

  async caseFetch(payload: LuponCaseFetchDto) {
    const result = await this.prismaService.luponCase.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        evidenceFile: true,
        User: {
          include: {
            UserInformation: {
              include: {
                Picture: true,
              },
            },
          },
        },
      },
    });

    return {
      case: result,
    };
  }

  async caseUpdate(payload: LuponCaseUpdateDto) {
    const result = await this.prismaService.luponCase.update({
      where: {
        id: payload.id,
      },
      data: {
        title: payload.title,
        respondentName: payload.respondentName,
        dateFiled: payload.dateFiled,
        dateOfConfrontation: payload.dateOfConfrontation,
        dateOfSettled: payload.dateOfSettled,
        remarks: payload.remarks,
        mainPointOfAgreement: payload.mainPointOfAgreement,
        actionTaken: payload.actionTaken,
        status: payload.status,
        evidenceFileId: payload.evidenceFileId,
      },
      include: {
        evidenceFile: true,
        User: {
          include: {
            UserInformation: {
              include: {
                Picture: true,
              },
            },
          },
        },
      },
    });

    return {
      case: result,
    };
  }
}
