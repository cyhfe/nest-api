import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.input';
import { Prisma } from '@prisma/client';

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
    const { username } = createDto;
    try {
      await this.usersServer.createUser(createDto);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException(`${username} has been used`);
        }
      }
      throw e;
    }
  }
}
