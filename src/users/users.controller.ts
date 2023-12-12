import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServer: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    console.log('all');
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
