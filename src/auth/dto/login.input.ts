import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
