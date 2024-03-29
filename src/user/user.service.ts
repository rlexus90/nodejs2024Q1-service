import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'src/types/user';
import { CreateUserDto } from './dto/createUserDto';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { UserEntity } from 'src/database/entity/userEntity';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const password = await bcrypt.hash(
      createUserDto.password,
      +process.env.CRYPT_SALT,
    );
    const userDto: UserDto = {
      ...createUserDto,
      password,
      id: uuid.v4(),
    };
    return await this.databaseService.userService.set(userDto);
  }

  async returnAllUsers() {
    return await this.databaseService.userService.getAll();
  }

  async returnUserById(id: string) {
    const user = await this.databaseService.userService.getById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return new UserEntity(user);
  }

  async updateUserPassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.databaseService.userService.getById(id);

    if (!user) throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);

    if (user.password !== updatePasswordDto.oldPassword)
      throw new HttpException(`oldPassword is wrong`, HttpStatus.FORBIDDEN);

    return this.databaseService.userService.update(id, {
      password: updatePasswordDto.newPassword,
      version: { increment: 1 },
    });
  }

  async deleteUser(id: string) {
    return this.databaseService.userService.delete(id);
  }
}
