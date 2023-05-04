import { IsEmail, IsOptional, IsUUID } from 'class-validator';

export class UserFetchDto {
  @IsOptional()
  @IsUUID()
  readonly id?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
