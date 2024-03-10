import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/types/user';
import { CreateUserDto } from './dto/greateUserDto';
import * as uuid from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { UpdatePasswordDto } from './dto/updatePasswordDto';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  createUser(createUserDto: CreateUserDto): User {
    const isUserExist = this.databaseService.users.some(
      (user) => user.login === createUserDto.login,
    );
    if (isUserExist)
      throw new HttpException(
        `User with login - ${createUserDto.login} already exist`,
        HttpStatus.BAD_REQUEST,
      );

    const user: User = {
      ...createUserDto,
      id: uuid.v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.databaseService.setUser(user);
    return user;
  }

  returnAllUsers() {
    return this.databaseService.users;
  }

  returtUserbyId(id: string) {
    const user = this.databaseService.getUserId(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  updateUserPassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.returtUserbyId(id);

    if (user.password !== updatePasswordDto.oldPassword)
      throw new HttpException(`oldPassword is wrong`, HttpStatus.FORBIDDEN);
    user.password = updatePasswordDto.newPassword;
  }

  deleteUser(id: string) {
    this.databaseService.delUser(id);
  }
}
