import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.input';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServer: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersServer.users({});
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.usersServer.user({ id });
  }

  @Post()
  async createUser(@Body() createDto: CreateUserDto) {
    return this.usersServer.createUser(createDto);
  }
}
