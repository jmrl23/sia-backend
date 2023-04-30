import { IsEmail } from 'class-validator';

export class UserResetPasswordDto {
  @IsEmail()
  readonly email: string;
}
