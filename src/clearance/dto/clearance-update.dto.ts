import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class ClearanceUpdateDto {
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsBoolean()
  readonly confirmed: boolean;
}
