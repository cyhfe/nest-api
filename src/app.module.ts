import { Logger, Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
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
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}
