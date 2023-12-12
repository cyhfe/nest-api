import { Prisma } from '@prisma/client';

import { UsersService } from '../users/users.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(data: Prisma.UserCreateInput) {
    return await this.usersService.createUser(data);
  }

  async login(loginInput: LoginInput) {
    const { username, password } = loginInput;

    const user = await this.validateUser(username, password);

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }
}