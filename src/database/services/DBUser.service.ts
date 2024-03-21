import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UserDto } from 'src/types/user';
import { UserEntity } from '../entity/userEntity';

@Injectable()
export class DbUserService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  async set(userDto: UserDto) {
    const user = await this.prisma.user.create({ data: userDto });
    return new UserEntity(user);
  }

  async update(id: string, userDto: User) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: userDto,
      });
      return new UserEntity(user);
    } catch (e) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
