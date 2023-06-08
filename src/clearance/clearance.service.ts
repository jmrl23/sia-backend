import { Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import {
  ClearanceListDto,
  ClearanceCreateDto,
  ClearanceUpdateDto,
  ClearanceFetchDto,
} from './dto';

@Injectable()
export class ClearanceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getList(payload: ClearanceListDto) {
    const result = await this.prismaService.clearance.findMany({
      where: {
        clearanceType: payload.clearanceType,
        clearanceTypeOthers: payload.clearanceTypeOthers,
        purposeOfClearance: payload.purposeOfClearance,
        registerVoterBarangay: payload.registerVoterBarangay,
        businessAddress: payload.businessAddress,
        nationality: payload.nationality,
        placeOfBirth: payload.placeOfBirth,
        numberOfYearsLiving: payload.numberOfYearsLiving,
        confirmed: payload.confirmed,
        userId: payload.userId,
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

    const noPasswordResult = result.map((clearance) => {
      delete clearance.User.password;

      return clearance;
    });

    return {
      clearances: noPasswordResult,
    };
  }

  async fetch(payload: ClearanceFetchDto) {
    const result = await this.prismaService.clearance.findUnique({
      where: {
        id: payload.id,
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
      clearance: result,
    };
  }

  async create(request: Request, payload: ClearanceCreateDto) {
    const result = await this.prismaService.clearance.create({
      data: {
        clearanceType: payload.clearanceType,
        clearanceTypeOthers: payload.clearanceTypeOthers,
        purposeOfClearance: payload.purposeOfClearance,
        registerVoterBarangay: payload.registerVoterBarangay,
        businessAddress: payload.businessAddress,
        nationality: payload.nationality,
        placeOfBirth: payload.placeOfBirth,
        numberOfYearsLiving: payload.numberOfYearsLiving,
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

    delete result.User.password;

    return {
      clearance: result,
    };
  }

  async update(payload: ClearanceUpdateDto) {
    const result = await this.prismaService.clearance.update({
      where: {
        id: payload.id,
      },
      data: {
        confirmed: payload.confirmed,
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
      clearance: result,
    };
  }
}
