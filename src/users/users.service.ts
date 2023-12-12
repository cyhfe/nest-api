import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/config/configuration';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  get saltRounds() {
    return this.configService.get<SecurityConfig>('security')!.saltRounds;
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const { username } = userWhereUniqueInput;
    const found = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (!found) {
      throw new NotFoundException(`${username} not found`);
    }

    return found;
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    const { username, password } = data;
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    try {
      const created = await this.prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
      return {
        id: created.id,
        username: created.username,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException(`${username} already exists`);
        }
      }
      throw new Error(e);
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
