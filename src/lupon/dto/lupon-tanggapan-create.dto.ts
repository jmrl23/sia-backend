import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsString, MinLength } from 'class-validator';

export class LuponTanggapanCreateDto {
  @IsString()
  @Transform(({ value }) => value?.toLowerCase?.().trim())
  @MinLength(5)
  readonly complainant: string;

  @IsString()
  @Transform(({ value }) => value?.toLowerCase?.().trim())
  @MinLength(5)
  readonly complained: string;

  @IsInt()
  readonly conversationCount: number;

  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(5)
  readonly about: string;

  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(10)
  readonly report1: string;

  @IsString()
  @Transform(({ value }) => value?.trim?.())
  @MinLength(10)
  readonly report2: string;

  @IsDateString()
  readonly date1: string;

  @IsDateString()
  readonly date2: string;
}
