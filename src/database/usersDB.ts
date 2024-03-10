import { Injectable } from '@nestjs/common';
import { User } from 'src/types/user';

@Injectable()
export class UsersDB {
  public users: User[] = [];

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
}
