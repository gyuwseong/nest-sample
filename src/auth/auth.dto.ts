import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEmail,
  IsUrl,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  url: string;
}

export class LogInDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @MinLength(4)
  @MaxLength(20)
  password: string;
}

export class AuthCredentialsDto {
  accessToken: string;
  username: string;
}
