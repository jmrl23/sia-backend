import { LuponActionTaken, LuponCaseStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
  IsUUID,
} from 'class-validator';

export class LuponCaseUpdateDto {
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(2)
  readonly title?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(2)
  readonly respondentName?: string;

  @IsOptional()
  @IsDateString()
  readonly dateFiled?: string;

  @IsOptional()
  @IsDateString()
  readonly dateOfConfrontation?: string;

  @IsOptional()
  @IsDateString()
  readonly dateOfSettled?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(2)
  readonly remarks?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(2)
  readonly mainPointOfAgreement?: string;

  @IsOptional()
  @IsEnum(LuponActionTaken)
  readonly actionTaken?: LuponActionTaken;

  @IsOptional()
  @IsEnum(LuponCaseStatus)
  readonly status?: LuponCaseStatus;

  @IsOptional()
  @IsUUID()
  readonly evidenceFileId?: string;
}
