import { BloodType, MaritalStatus, Role, Sex } from '@prisma/client';
import { Transform } from 'class-transformer';
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
  Matches,
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
  @Transform(({ value }) => value?.toLowerCase?.().trim())
  readonly email?: string;

  @IsOptional()
  @IsArray()
  readonly keywords?: string[];

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(5)
  readonly streetAddress?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly city?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly barangay?: string;

  @IsOptional()
  @IsString({ message: 'Invalid precinct number' })
  readonly precinctNumber?: string;

  @IsOptional()
  @IsString({ message: 'Invalid emergency contact person' })
  readonly emergencyContactPerson?: string;

  @IsOptional()
  @IsString({ message: 'Invalid emergency contact number' })
  @Matches(/(^(\+63)(\d){10}$)/, {
    message: 'Invalid emergency contact number',
  })
  readonly emergencyContactNumber?: string;

  @IsOptional()
  @IsEnum(Sex, { message: 'Invalid sex' })
  readonly sex?: Sex;

  @IsOptional()
  @IsEnum(MaritalStatus, { message: 'Invalid marital status' })
  readonly maritalStatus?: MaritalStatus;

  @IsOptional()
  @IsEnum(BloodType, { message: 'Invalid blood type' })
  readonly bloodType?: BloodType;

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
