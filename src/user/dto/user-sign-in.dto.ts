import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

export class UserSignInDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim())
  readonly email: string;

  @IsString()
  @Length(4, 32)
  readonly password: string;
}
