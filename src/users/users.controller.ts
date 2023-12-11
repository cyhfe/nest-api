import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly useServer: UsersService) {}

  @Get()
  getAllUsers() {
    return this.useServer.users({});
  }

  @Post()
  createUser() {}
}
