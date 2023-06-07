import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class LuponCaseCreateDto {
  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(5)
  readonly title: string;

  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(1)
  readonly complaintNature: string;

  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(1)
  readonly statusOfCompliance: string;

  @IsDateString()
  readonly dateOfInitial: string;

  @IsDateString()
  readonly dateOfSettled: string;

  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(1)
  readonly remarks: string;

  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(1)
  readonly mainPointOfAgreement: string;

  @IsOptional()
  @IsUUID()
  readonly evidenceFileId: string;
}
