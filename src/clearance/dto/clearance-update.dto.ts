import { ClearanceType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class ClearanceUpdateDto {
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsBoolean()
  readonly confirmed: boolean;

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
}
