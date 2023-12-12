import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'nestjs-prisma';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/config/configuration';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    UsersModule,
    // JwtModule.register({
    //   secret: ConfigService,
    //   signOptions: { expiresIn: '5m' }, // e.g. 30s, 7d, 24h
    // }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security')!;
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
