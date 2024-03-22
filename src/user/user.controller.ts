import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User, UserResp } from 'src/types/user';
import { CreateUserDto } from './dto/greateUserDto';
import { UserService } from './user.service';
import { UpdatePasswordDto } from './dto/updatePasswordDto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getUsers(): User[] {
    return this.userService.returnAllUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string): User {
    return this.userService.returtUserbyId(id);
  }

  @Post('')
  createUser(@Body() createUserDto: CreateUserDto): UserResp {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserResp {
    return this.userService.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    this.userService.deleteUser(id);
  }
}
