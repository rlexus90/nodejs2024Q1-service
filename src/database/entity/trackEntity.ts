import { Track } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class TrackEntity {
  id: string;
  name: string;
  artistId: string;
  albumId: string;
  duration: number;

  @Exclude()
  favorite: boolean;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
