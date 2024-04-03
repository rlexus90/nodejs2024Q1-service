import { Album } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AlbumEntity {
  id: string;
  name: string;
  year: number;
  artistId: string;

  @Exclude()
  favorite: boolean;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
