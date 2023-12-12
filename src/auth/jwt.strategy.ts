import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { jwtSecret } from './auth.module';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import { JwtDto } from './dto/jwtDto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private prismaService: PrismaService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: JwtDto): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
