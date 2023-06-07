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
import { Transform } from 'class-transformer';

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
  @Transform(({ value }) => value?.toLowerCase?.().trim())
  @MinLength(1, { message: 'Invalid firstname' })
  readonly firstName?: string;

  @IsOptional()
  @IsString({ message: 'No middlename' })
  @Transform(({ value }) => value?.toLowerCase?.().trim())
  @MinLength(1, { message: 'Invalid middlename' })
  readonly middleName?: string;

  @IsOptional()
  @IsString({ message: 'No lastname' })
  @Transform(({ value }) => value?.toLowerCase?.().trim())
  @MinLength(1, { message: 'Invalid lastname' })
  readonly lastName?: string;

  @IsOptional()
  @IsString({ message: 'Invalid suffix' })
  @Transform(({ value }) => value?.toLowerCase?.().trim())
  @MinLength(1, { message: 'Invalid suffix' })
  readonly nameSuffix?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toLowerCase?.().trim())
  @Matches(/(^(\+63)(\d){10}$)/, { message: 'Invalid contact number' })
  readonly contactNumber?: string;

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
  @Transform(({ value }) => value?.toLowerCase?.().trim())
  @MinLength(3)
  readonly occupation?: string;

  @IsOptional()
  @IsUUID()
  readonly pictureId?: string;

  @IsOptional()
  @IsString({ message: 'Invalid Street Address' })
  @MinLength(5, { message: 'Invalid Street Address' })
  readonly streetAddress?: string;

  @IsOptional()
  @IsString()
  readonly city?: string;

  @IsOptional()
  @IsString()
  readonly barangay?: string;

  @IsOptional()
  @IsString({ message: 'Invalid precinct number' })
  readonly precinctNumber?: string;

  @IsOptional()
  @IsString({ message: 'Invalid emergency contact person' })
  readonly emergencyContactPerson?: string;

  @IsOptional()
  @IsString({ message: 'Invalid emergency contact relationship' })
  readonly emergencyContactRelationship?: string;

  @IsOptional()
  @IsString({ message: 'Invalid emergency contact number' })
  @Matches(/(^(\+63)(\d){10}$)/, {
    message: 'Invalid emergency contact number',
  })
  readonly emergencyContactNumber?: string;
}
