import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/common/types/user';
import {
  UserCreateDto,
  UserListDto,
  UserSignInDto,
  UserUpdateDto,
} from './dto';
import { genSalt, hash, compare } from 'bcrypt';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { JWTService } from 'src/common/services/jwt/jwt.service';
import { Role } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { type Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JWTService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  getSession(user: User) {
    return user ?? null;
  }

  async createUser(payload: UserCreateDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (existingUser) throw new BadRequestException('Email already used');

    const password = await this.hashPassword(payload.password);
    const user = await this.prismaService.user.create({
      data: {
        email: payload.email,
        password,
        role: payload.role,
        UserInformation: {
          create: {
            firstName: payload.firstName,
            middleName: payload.middleName,
            lastName: payload.lastName,
            nameSuffix: payload.nameSuffix,
            contactNumber: payload.contactNumber,
            address: payload.address,
            dateOfBirth: payload.dateOfBirth,
            pictureId: payload.pictureId,
            sex: payload.sex,
            bloodType: payload.bloodType,
            maritalStatus: payload.maritalStatus,
            occupation: payload.occupation,
          },
        },
      },
    });

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '3 days',
      },
    );

    return { token };
  }

  async signIn(payload: UserSignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) throw new BadRequestException('Email is incorrect');

    const matched = compare(payload.password, user.password);

    if (!matched) throw new BadRequestException('Password is incorrect');

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '3 days',
      },
    );

    return { token };
  }

  async update(user: User, payload: UserUpdateDto) {
    if (
      !user ||
      (user.id !== payload.id && user.role !== Role.ADMIN) ||
      (user.role !== Role.ADMIN && 'role' in payload)
    ) {
      throw new UnauthorizedException('Cannot process the request');
    }

    let password: string;

    if (payload.password) {
      password = await this.hashPassword(payload.password);
    }

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: payload.id,
      },
      data: {
        password,
        role: payload.role,
        UserInformation: {
          update: {
            firstName: payload.firstName,
            middleName: payload.middleName,
            lastName: payload.lastName,
            nameSuffix: payload.nameSuffix,
            contactNumber: payload.contactNumber,
            address: payload.address,
            dateOfBirth: payload.dateOfBirth,
            sex: payload.sex,
            bloodType: payload.bloodType,
            maritalStatus: payload.maritalStatus,
            occupation: payload.occupation,
            pictureId: payload.pictureId,
          },
        },
      },
      include: {
        UserInformation: true,
      },
    });

    if (!updatedUser) throw new BadRequestException('User not found');

    delete updatedUser.password;

    await this.cacheService.del(`user.session.${updatedUser.id}`);

    return {
      user: updatedUser,
    };
  }

  async getList(payload: UserListDto) {
    const cache = await this.cacheService.get(
      `user.list.${JSON.stringify(payload)}`,
    );

    if (cache) {
      return {
        users: cache,
      };
    }

    const users = await this.prismaService.user.findMany({
      where: {
        enabled: payload.enabled,
        verified: payload.verified,
        email: payload.email,
        role: {
          in: payload.role,
        },
        UserInformation: {
          address: payload.address,
          sex: payload.sex,
          maritalStatus: payload.maritalStatus,
          bloodType: payload.bloodType,
          precinctNumber: payload.precinctNumber,
          contactNumber: {
            search: payload.keywords?.join(' '),
          },
          firstName: {
            search: payload.keywords?.join(' '),
          },
          middleName: {
            search: payload.keywords?.join(' '),
          },
          lastName: {
            search: payload.keywords?.join(' '),
          },
          nameSuffix: {
            search: payload.keywords?.join(' '),
          },
        },
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
        UserInformation: true,
      },
      orderBy: {
        dateCreated: payload.orderBy ?? 'desc',
      },
      take: payload.take,
      skip: payload.skip,
    });

    const serializedUsers = users.map((user) => {
      if ('password' in user) delete user.password;
      return user;
    });

    await this.cacheService.set(
      `user.list.${JSON.stringify(payload)}`,
      serializedUsers,
    );

    return {
      users: serializedUsers,
    };
  }

  async hashPassword(password: string) {
    const salt = await genSalt(3);
    const result = await hash(password, salt);
    return result;
  }
}
