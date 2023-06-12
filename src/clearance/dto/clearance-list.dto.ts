import { ClearanceType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  IsBoolean,
  IsInt,
  IsPositive,
  IsArray,
  IsDateString,
  IsUUID,
} from 'class-validator';

enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

export class ClearanceListDto {
  @IsOptional()
  @IsEnum(ClearanceType)
  readonly clearanceType: ClearanceType;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toUppercase?.().trim())
  @MinLength(3)
  readonly clearanceTypeOthers?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim?.())
  readonly purposeOfClearance: string;

  @IsOptional()
  @IsBoolean()
  readonly registerVoterBarangay: boolean;

  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly businessAddress: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toLowerCase?.().trim())
  @MinLength(3)
  readonly nationality: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(3)
  readonly placeOfBirth: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  readonly numberOfYearsLiving: number;

  @IsOptional()
  @IsBoolean()
  readonly confirmed: boolean;

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
