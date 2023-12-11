import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  usename: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
