import { BloodType, MaritalStatus, Role, Sex } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
  IsEmail,
  MinLength,
} from 'class-validator';

enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

export class UserListDto {
  @IsOptional()
  @IsBoolean()
  readonly enabled?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly verified?: boolean;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsArray()
  readonly keywords?: string[];

  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly address?: string;

  @IsOptional()
  @IsEnum(Sex, { message: 'Invalid sex' })
  readonly sex?: Sex;

  @IsOptional()
  @IsEnum(MaritalStatus, { message: 'Invalid marital status' })
  readonly maritalStatus?: MaritalStatus;

  @IsOptional()
  @IsEnum(BloodType, { message: 'Invalid blood type' })
  readonly bloodType?: BloodType;

  @IsOptional()
  @IsString()
  @MinLength(1)
  readonly precinctNumber?: string;

  @IsArray()
  @IsEnum(Role, { each: true, message: 'Invalid role' })
  readonly role: Role[];

  @IsOptional()
  @IsDateString({}, { message: 'Invalid date created from' })
  readonly dateCreatedFrom?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Invalid date created to' })
  readonly dateCreatedTo?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Invalid date updated from' })
  readonly dateUpdatedFrom?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Invalid date updated to' })
  readonly dateUpdatedTo?: string;

  @IsOptional()
  @IsInt()
  readonly take?: number;

  @IsOptional()
  @IsInt()
  readonly skip?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(OrderBy, { message: 'Order by should be only ASC or DESC' })
  readonly orderBy?: OrderBy;
}
