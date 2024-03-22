import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { FavoritesResponse } from 'src/types/favorites';

@Injectable()
export class FavsService {
  constructor(private databaseService: DatabaseService) {}

  async returnFavs() {
    const favs: FavoritesResponse = {
      artists: await this.databaseService.artistService.returnFavs(),
      albums: await this.databaseService.albumService.returnFavs(),
      tracks: await this.databaseService.trackService.returnFavs(),
    };
    return favs;
  }

  async setTrack(id: string) {
    this.databaseService.trackService.addToFavs(id);
  }

  delTrack(id: string) {
    this.databaseService.trackService.delFromFavs(id);
  }

  setAlbum(id: string) {
    this.databaseService.albumService.addToFavs(id);
  }

  delAlbum(id: string) {
    this.databaseService.albumService.delFromFavs(id);
  }

  setArtist(id: string) {
    this.databaseService.artistService.addToFavs(id);
  }

  delArtist(id: string) {
    this.databaseService.artistService.delFromFavs(id);
  }
}
