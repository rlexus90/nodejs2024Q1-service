import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserResp } from 'src/types/user';
import { CreateUserDto } from './dto/createUserDto';
import * as uuid from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { UpdatePasswordDto } from './dto/updatePasswordDto';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  createUser(createUserDto: CreateUserDto): UserResp {
    const user: User = {
      ...createUserDto,
      id: uuid.v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.databaseService.setUser(user);
    const userResp = Object.assign({}, user);
    delete userResp.password as unknown as UserResp;
    return userResp;
  }

  returnAllUsers() {
    return this.databaseService.users;
  }

  returnUserById(id: string) {
    const user = this.databaseService.getUserId(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  updateUserPassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.returnUserById(id);

    if (user.password !== updatePasswordDto.oldPassword)
      throw new HttpException(`oldPassword is wrong`, HttpStatus.FORBIDDEN);
    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    const userResp = Object.assign({}, user);
    delete userResp.password as unknown as UserResp;
    return userResp;
  }

  deleteUser(id: string) {
    this.databaseService.delUser(id);
  }
}
