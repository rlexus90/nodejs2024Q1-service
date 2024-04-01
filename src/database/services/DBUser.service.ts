import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UserDto } from 'src/types/user';
import { UserEntity } from '../entity/userEntity';

@Injectable()
export class DbUserService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<UserEntity[]> {
    try {
      const users = await this.prisma.user.findMany();
      return users.map((user) => new UserEntity(user));
    } catch (e) {
      console.log(e);
    }
  }

  async set(userDto: UserDto) {
    try {
      const user = await this.prisma.user.create({ data: userDto });
      return new UserEntity(user);
    } catch (e) {
      console.log(e);
    }
  }

  async update(id: string, userDto: UpdatePassDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: userDto,
      });
      return new UserEntity(user);
    } catch (e) {
      console.log(e);
    }
  }

  async getById(id: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getByLogin(login: string) {
    try {
      return await this.prisma.user.findMany({ where: { login } });
    } catch (e) {
      console.log(e);
    }
  }
}

type UpdatePassDto = {
  password: string;
  version: { increment: number };
};
