import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsString,
  IsUUID,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

import { BloodType, MaritalStatus, Role, Sex } from '@prisma/client';

export class UserUpdateDto {
  @IsUUID('all', { message: 'Invalid id' })
  readonly id: string;

  @IsOptional()
  @IsString()
  @Length(4, 32)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password is too weak',
  })
  readonly password?: string;

  @IsOptional()
  @IsBoolean()
  readonly enabled?: boolean;

  @IsOptional()
  @IsEnum(Role, { message: 'Invalid role' })
  readonly role?: Role;

  @IsOptional()
  @IsString({ message: 'No firstname' })
  @MinLength(1, { message: 'Invalid firstname' })
  readonly firstName?: string;

  @IsOptional()
  @IsString({ message: 'No middlename' })
  @MinLength(1, { message: 'Invalid middlename' })
  readonly middleName?: string;

  @IsOptional()
  @IsString({ message: 'No lastname' })
  @MinLength(1, { message: 'Invalid lastname' })
  readonly lastName?: string;

  @IsOptional()
  @IsString({ message: 'Invalid suffix' })
  @MinLength(1, { message: 'Invalid suffix' })
  readonly nameSuffix?: string;

  @IsOptional()
  @Matches(/(^(\+63)(\d){10}$)/, { message: 'Invalid contact number' })
  readonly contactNumber?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  readonly address?: string;

  @IsOptional()
  @IsDateString(undefined, { message: 'Invalid date of birth' })
  readonly dateOfBirth?: string;

  @IsOptional()
  @IsEnum(Sex, { message: 'Invalid sex' })
  readonly sex?: Sex;

  @IsOptional()
  @IsEnum(BloodType, { message: 'invalid blood type' })
  readonly bloodType?: BloodType;

  @IsOptional()
  @IsEnum(MaritalStatus, { message: 'Invalid marital status' })
  readonly maritalStatus?: MaritalStatus;

  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly occupation?: string;

  @IsOptional()
  @IsUUID()
  readonly pictureId?: string;
}
