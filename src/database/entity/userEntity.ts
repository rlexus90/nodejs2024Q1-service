import { User } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';

export class UserEntity {
  id: string;
  login: string;
  version: number;

  @Exclude()
  password: string;

  @Transform(({ value }) => value.getTime())
  createdAt: Date;

  @Transform(({ value }) => value.getTime())
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
