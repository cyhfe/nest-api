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
import { AutoLoginInput } from './dto/autoLogin.input';
import { JwtDto } from './dto/jwtDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(data: Prisma.UserCreateInput) {
    const user = await this.usersService.createUser(data);

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      user: {
        username: user.username,
        id: user.id,
      },
    };
  }

  async login(loginInput: LoginInput) {
    const { username, password } = loginInput;

    const user = await this.validateUser(username, password);

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      user: {
        username: user.username,
        id: user.id,
      },
    };
  }

  async autoLogin(data: AutoLoginInput) {
    const { token } = data;
    try {
      const payload = (await this.jwtService.verifyAsync(token)) as JwtDto;
      const user = await this.usersService.user({
        id: payload.userId,
      });
      if (!user) {
        throw new NotFoundException();
      }
      return {
        user: {
          username: user.id,
          id: user.id,
        },
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
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
