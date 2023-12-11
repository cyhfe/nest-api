import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), TasksModule, UsersModule],
})
export class AppModule {}
