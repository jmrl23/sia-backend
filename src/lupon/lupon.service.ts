import { Injectable } from '@nestjs/common';
import {
  LuponCaseCreateDto,
  LuponCaseFetchDto,
  LuponCaseListDto,
  LuponCaseUpdateDto,
} from './dto';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import type { Request } from 'express';
import { Role } from '@prisma/client';

@Injectable()
export class LuponService {
  constructor(private readonly prismaService: PrismaService) {}

  async caseFetch(request: Request, payload: LuponCaseFetchDto) {
    const result = await this.prismaService.luponCase.findFirst({
      where: {
        id: payload.id,
        userId: request.user.role === Role.ADMIN ? void 0 : request.user.id,
      },
      include: {
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

    delete result.User.password;

    return {
      case: result,
    };
  }

  async caseList(request: Request, payload: LuponCaseListDto) {
    const result = await this.prismaService.luponCase.findMany({
      where: {
        title: {
          search: payload.title,
        },
        complaintNature: {
          search: payload.complaintNature,
        },
        statusOfCompliance: {
          search: payload.statusOfCompliance,
        },
        dateOfInitial: payload.dateOfInitial,
        dateOfSettled: payload.dateOfSettled,
        remarks: {
          search: payload.remarks,
        },
        mainPointOfAgreement: {
          search: payload.mainPointOfAgreement,
        },
        userId: payload.userId,
        status: payload.status,
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

    const noPasswordResult = result.map(($case) => {
      delete $case.User.password;

      return $case;
    });

    return {
      cases: noPasswordResult,
    };
  }

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
      include: {
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
        status: payload.status,
      },
      include: {
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
