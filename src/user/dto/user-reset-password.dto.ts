import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class UserResetPasswordDto {
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase?.().trim())
  readonly email: string;
}
