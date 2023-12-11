import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('/signup')
  async signup(@Body() data: SignupInput) {
    return this.auth.createUser(data);
  }
}
