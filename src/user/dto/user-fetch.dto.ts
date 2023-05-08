import { IsEmail, IsOptional, IsUUID } from 'class-validator';

export class UserFetchDto {
  @IsOptional()
  @IsUUID('all', { message: 'Invalid id' })
  readonly id?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
