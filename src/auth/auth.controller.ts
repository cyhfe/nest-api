import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('/signup')
  signup(@Body() data: SignupInput) {
    return this.auth.signup(data);
  }

  @Post('/login')
  login(@Body() data: LoginInput) {
    return this.auth.login(data);
  }
}
