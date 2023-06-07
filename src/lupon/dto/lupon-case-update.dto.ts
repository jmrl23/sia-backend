import { LuponCaseStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class LuponCaseUpdateDto {
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsEnum(LuponCaseStatus)
  readonly status: LuponCaseStatus;
}
