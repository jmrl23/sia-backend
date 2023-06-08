import { ClearanceType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class ClearanceCreateDto {
  @IsEnum(ClearanceType)
  readonly clearanceType: ClearanceType;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toUppercase?.().trim())
  @MinLength(3)
  readonly clearanceTypeOthers?: string;

  @IsString()
  @Transform(({ value }) => value?.trim?.())
  readonly purposeOfClearance: string;

  @IsBoolean()
  readonly registerVoterBarangay: boolean;

  @IsString()
  @MinLength(3)
  readonly businessAddress: string;

  @IsString()
  @Transform(({ value }) => value?.toLowerCase?.().trim())
  @MinLength(3)
  readonly nationality: string;

  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(3)
  readonly placeOfBirth: string;

  @IsInt()
  @IsPositive()
  readonly numberOfYearsLiving: number;
}
