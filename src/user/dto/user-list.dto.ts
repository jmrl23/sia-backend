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
  @IsString()
  readonly precinctNumber?: string;

  @IsOptional()
  @IsString()
  readonly emergencyContactPerson?: string;

  @IsOptional()
  @IsString()
  @Matches(/(^(\+63)(\d){10}$)/, {
    message: 'Invalid emergency contact number',
  })
  readonly emergencyContactNumber?: string;

  @IsOptional()
  @IsEnum(Sex)
  readonly sex?: Sex;

  @IsOptional()
  @IsEnum(MaritalStatus)
  readonly maritalStatus?: MaritalStatus;

  @IsOptional()
  @IsEnum(BloodType)
  readonly bloodType?: BloodType;

  @IsArray()
  @IsEnum(Role, { each: true })
  readonly role: Role[];

  @IsOptional()
  @IsDateString()
  readonly dateCreatedFrom?: string;

  @IsOptional()
  @IsDateString()
  readonly dateCreatedTo?: string;

  @IsOptional()
  @IsDateString()
  readonly dateUpdatedFrom?: string;

  @IsOptional()
  @IsDateString()
  readonly dateUpdatedTo?: string;

  @IsOptional()
  @IsInt()
  readonly take?: number;

  @IsOptional()
  @IsInt()
  readonly skip?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(OrderBy)
  readonly orderBy?: OrderBy;
}
