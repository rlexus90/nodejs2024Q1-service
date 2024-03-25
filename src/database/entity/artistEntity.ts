import { Artist } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ArtistEntity {
  id: string;
  name: string;
  grammy: boolean;

  @Exclude()
  favorite: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
