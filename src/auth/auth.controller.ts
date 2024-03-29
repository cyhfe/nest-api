import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { AutoLoginInput } from './dto/autoLogin.input';

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

  @Post('/autoLogin')
  autoLogin(@Body() data: AutoLoginInput) {
    return this.auth.autoLogin(data);
  }
}
