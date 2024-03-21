export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export type UserResp = Omit<User, 'password'>;

export type UserDto = Omit<User, 'version' | 'createdAt' | 'updatedAt'>;
