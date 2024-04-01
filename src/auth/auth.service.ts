import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { createToken } from 'src/helpers/token';
import { RefreshDto } from './dto/refreshDto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private databaseService: DatabaseService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  async login(createUserDto: CreateUserDto) {
    const users = await this.databaseService.userService.getByLogin(
      createUserDto.login,
    );

    const [user] = await Promise.all(
      users.map(async (user) =>
        (await bcrypt.compare(createUserDto.password, user.password))
          ? user
          : undefined,
      ),
    ).then((arr) => arr.filter((user) => user));

    if (!user)
      throw new HttpException(`Authentication failed`, HttpStatus.FORBIDDEN);

    return createToken({ id: user.id, login: user.login }, this.jwtService);
  }

  async refresh(refreshDto: RefreshDto) {
    try {
      const decode = await this.jwtService.verify(refreshDto.refreshToken);
      return createToken(
        { id: decode.id, login: decode.login },
        this.jwtService,
      );
    } catch {
      throw new HttpException(
        `Refresh token is invalid or expired`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
