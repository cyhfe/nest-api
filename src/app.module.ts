import { Logger, Module } from '@nestjs/common';

import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import configuration from './config/configuration';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          // configure your prisma middleware
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    UsersModule,
    AuthModule,
    UploadModule,
  ],
})
export class AppModule {}
