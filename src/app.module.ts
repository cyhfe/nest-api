import { Logger, Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
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
    TasksModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
