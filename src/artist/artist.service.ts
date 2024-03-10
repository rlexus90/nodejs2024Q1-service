import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto } from './dto/createArtistDto';
import { Artist } from 'src/types/artist';
import * as uuid from 'uuid';
import { UpdateArtistDto } from './dto/updateArtistDto';

@Injectable()
export class ArtistService {
  constructor(private databaseService: DatabaseService) {}

  returnAllArtists() {
    return this.databaseService.artists;
  }

  returnArtistById(id: string) {
    const artist = this.databaseService.getArtistId(id);
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto): Artist {
    const artist: Artist = {
      ...createArtistDto,
      id: uuid.v4(),
    };
    this.databaseService.setArtist(artist);
    return artist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    return this.databaseService.updateArtist(id, updateArtistDto);
  }

  delArtist(id: string) {
    this.databaseService.delArtist(id);
  }
}
