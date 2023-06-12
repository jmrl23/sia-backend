import { LuponActionTaken } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
  IsUUID,
} from 'class-validator';

export class LuponCaseCreateDto {
  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(2)
  readonly title: string;

  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(2)
  readonly respondentName: string;

  @IsDateString()
  readonly dateFiled: string;

  @IsOptional()
  @IsDateString()
  readonly dateOfConfrontation?: string;

  @IsOptional()
  @IsDateString()
  readonly dateOfSettled?: string;

  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(2)
  readonly remarks: string;

  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(2)
  readonly mainPointOfAgreement: string;

  @IsOptional()
  @IsEnum(LuponActionTaken)
  readonly actionTaken?: LuponActionTaken;

  @IsOptional()
  @IsUUID()
  readonly evidenceFileId?: string;
}
