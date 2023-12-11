import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.input';

@Controller('users')
export class UsersController {
  constructor(private readonly useServer: UsersService) {}

  @Get()
  getAllUsers() {
    return this.useServer.users({});
  }

  @Post()
  createUser(@Body() createDto: CreateUserDto) {
    return this.useServer.createUser(createDto);
  }
}
