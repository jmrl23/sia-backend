import { LuponCaseStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsUUID,
  IsDateString,
  IsInt,
  IsArray,
  IsEnum,
  IsString,
  MinLength,
} from 'class-validator';

enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

export class LuponCaseListDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(5)
  readonly title: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(1)
  readonly complaintNature: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(1)
  readonly statusOfCompliance: string;

  @IsOptional()
  @IsDateString()
  readonly dateOfInitial: string;

  @IsOptional()
  @IsDateString()
  readonly dateOfSettled: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(1)
  readonly remarks: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(1)
  readonly mainPointOfAgreement: string;

  @IsOptional()
  @IsUUID()
  readonly userId: string;

  @IsOptional()
  @IsEnum(LuponCaseStatus)
  readonly status: LuponCaseStatus;

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
