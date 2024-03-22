import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto } from './dto/createArtistDto';
import { Artist } from 'src/types/artist';
import * as uuid from 'uuid';
import { UpdateArtistDto } from './dto/updateArtistDto';

@Injectable()
export class ArtistService {
  constructor(private databaseService: DatabaseService) {}

  async returnAllArtists() {
    return this.databaseService.artistService.getAll();
  }

  async returnArtistById(id: string) {
    const artist = await this.databaseService.artistService.getById(id);
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto): Artist {
    const artist: Artist = {
      ...createArtistDto,
      id: uuid.v4(),
    };
    this.databaseService.artistService.set(artist);
    return artist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    return this.databaseService.artistService.update(id, updateArtistDto);
  }

  async delArtist(id: string) {
    return this.databaseService.artistService.delete(id);
  }
}
