import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, defaultUser } from 'src/types/user';

@Injectable()
export class DatabaseService {
  public users: User[] = [defaultUser];

  public getUsers = (): User[] => {
    return this.users;
  };

  public getUserId = (id: string): User | undefined => {
    const user = this.users.find((user) => user.id === id);
    return user;
  };

  public setUser = (user: User) => {
    this.users.push(user);
  };

  public delUser = (id: string) => {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    this.users.splice(index, 1);
  };
}
