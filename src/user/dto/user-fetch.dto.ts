import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsUUID } from 'class-validator';

export class UserFetchDto {
  @IsOptional()
  @IsUUID('all', { message: 'Invalid id' })
  readonly id?: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim())
  readonly email?: string;
}
