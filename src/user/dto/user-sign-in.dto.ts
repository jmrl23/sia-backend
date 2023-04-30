import { IsEmail, IsString, Length } from 'class-validator';

export class UserSignInDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(4, 32)
  readonly password: string;
}
