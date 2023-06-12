import { LuponActionTaken } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsUUID,
  IsDateString,
  IsInt,
  IsArray,
  IsEnum,
  MinLength,
  IsString,
} from 'class-validator';

enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

export class LuponCaseListDto {
  @IsOptional()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(2)
  readonly title?: string;

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
  @IsUUID()
  readonly evidenceFileId?: string;

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
