import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { UserEntity } from 'src/database/entity/userEntity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getUsers(): Promise<UserEntity[]> {
    return this.userService.returnAllUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.userService.returnUserById(id);
  }

  @Post('')
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return this.userService.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.userService.deleteUser(id);
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
