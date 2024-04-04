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
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { UserEntity } from 'src/database/entity/userEntity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.returnAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return await this.userService.returnUserById(id);
  }

  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return await this.userService.updateUserPassword(id, updatePasswordDto);
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
