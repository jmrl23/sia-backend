import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/common/types/user';
import {
  UserCreateDto,
  UserFetchDto,
  UserListDto,
  UserResetPasswordDto,
  UserSignInDto,
  UserUpdateDto,
} from './dto';
import { genSalt, hash, compare } from 'bcrypt';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { JWTService } from 'src/common/services/jwt/jwt.service';
import { Role } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { type Cache } from 'cache-manager';
import { randomUUID } from 'crypto';
import { generate as generatePassword } from 'generate-password';
import { GmailService } from 'src/common/services/gmail/gmail.service';
import { EJSService } from 'src/common/services/ejs/ejs.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JWTService,
    private readonly gmailService: GmailService,
    private readonly ejsService: EJSService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  getSession(user: User) {
    return user ?? null;
  }

  async getData(payload: UserFetchDto) {
    if (!payload.id && !payload.email) {
      return {
        user: null,
      };
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.id,
        email: payload.email,
      },
      include: {
        LuponCase: {
          include: {
            evidenceFile: true,
          },
        },
        Clearance: true,
        UserInformation: {
          include: {
            Picture: true,
          },
        },
      },
    });

    delete user.password;

    return {
      user,
    };
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
            streetAddress: payload.streetAddress,
            city: payload.city,
            barangay: payload.barangay,
            dateOfBirth: payload.dateOfBirth,
            pictureId: payload.pictureId,
            sex: payload.sex,
            bloodType: payload.bloodType,
            maritalStatus: payload.maritalStatus,
            occupation: payload.occupation,
            precinctNumber: payload.precinctNumber,
            emergencyContactPerson: payload.emergencyContactPerson,
            emergencyContactRelationship: payload.emergencyContactRelationship,
            emergencyContactNumber: payload.emergencyContactNumber,
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

    const matched = await compare(payload.password, user.password);

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
      (user.role !== Role.ADMIN && 'role' in payload) ||
      (user.role !== Role.ADMIN &&
        'enabled' in payload &&
        user.id === payload.id)
    ) {
      throw new UnauthorizedException('Cannot process the request');
    }

    let password: string;

    if ('password' in payload) {
      password = await this.hashPassword(payload.password);
    }

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: payload.id,
      },
      data: {
        password,
        role: payload.role,
        residentStatus: payload.residentStatus,
        enabled: payload.enabled,
        UserInformation: {
          update: {
            firstName: payload.firstName,
            middleName: payload.middleName,
            lastName: payload.lastName,
            nameSuffix: payload.nameSuffix,
            contactNumber: payload.contactNumber,
            streetAddress: payload.streetAddress,
            city: payload.city,
            barangay: payload.barangay,
            dateOfBirth: payload.dateOfBirth,
            sex: payload.sex,
            bloodType: payload.bloodType,
            maritalStatus: payload.maritalStatus,
            occupation: payload.occupation,
            pictureId: payload.pictureId,
            precinctNumber: payload.precinctNumber,
            emergencyContactPerson: payload.emergencyContactPerson,
            emergencyContactRelationship: payload.emergencyContactRelationship,
            emergencyContactNumber: payload.emergencyContactNumber,
          },
        },
      },
      include: {
        LuponCase: {
          include: {
            evidenceFile: true,
          },
        },
        Clearance: true,
        UserInformation: {
          include: {
            Picture: true,
          },
        },
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
    const users = await this.prismaService.user.findMany({
      where: {
        enabled: payload.enabled,
        email: payload.email,
        role: {
          in: payload.role,
        },
        UserInformation: {
          streetAddress: payload.streetAddress,
          city: payload.city,
          barangay: payload.barangay,
          sex: payload.sex,
          maritalStatus: payload.maritalStatus,
          bloodType: payload.bloodType,
          precinctNumber: payload.precinctNumber,
          emergencyContactPerson: payload.emergencyContactPerson,
          emergencyContactNumber: payload.emergencyContactNumber,
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
        LuponCase: {
          include: {
            evidenceFile: true,
          },
        },
        Clearance: true,
        UserInformation: {
          include: {
            Picture: true,
          },
        },
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

    return {
      users: serializedUsers,
    };
  }

  async requestResetPassword(payload: UserResetPasswordDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const expires = new Date();
    const code = `${randomUUID()}-${generatePassword({ length: 10 })}`;
    expires.setDate(expires.getDate() + 1);

    const userResetPassword = await this.prismaService.userResetPassword.create(
      {
        data: {
          userId: user.id,
          expires,
          code,
        },
      },
    );

    const html = await this.ejsService.render<{ url: string }>(
      'user-reset-password',
      {
        url: `${this.configService.get<string>(
          'CLIENT_URL',
        )}/api/user/reset-password/${userResetPassword.id}/${
          userResetPassword.code
        }`,
      },
    );

    await this.gmailService.sendEmail({
      to: user.email,
      subject: 'Account reset password',
      html,
    });

    return { success: true };
  }

  async resetPassword(id: string, code: string) {
    const userResetPassword =
      await this.prismaService.userResetPassword.findFirst({
        where: {
          id,
          consumed: false,
          code,
          expires: {
            gt: new Date(),
          },
        },
      });

    if (!userResetPassword) {
      throw new BadRequestException('Invalid request');
    }

    await this.prismaService.userResetPassword.update({
      where: {
        id: userResetPassword.id,
      },
      data: {
        consumed: true,
      },
    });

    const password = generatePassword({
      length: 15,
      numbers: true,
    });

    const hashedPassword = await this.hashPassword(password);
    const user = await this.prismaService.user.update({
      where: {
        id: userResetPassword.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    const html = await this.ejsService.render<{ password: string }>(
      'user-reset-password-notify',
      {
        password,
      },
    );
    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '3 days',
      },
    );

    await this.cacheService.del(`user.session.${user.id}`);
    await this.gmailService.sendEmail({
      to: user.email,
      subject: 'Account reset password',
      html,
    });

    return { token };
  }

  async hashPassword(password: string) {
    const salt = await genSalt(3);
    const result = await hash(password, salt);
    return result;
  }
}
