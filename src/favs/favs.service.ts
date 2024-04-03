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

  setTrack(id: string) {
    return this.databaseService.trackService.addToFavs(id);
  }

  delTrack(id: string) {
    return this.databaseService.trackService.delFromFavs(id);
  }

  setAlbum(id: string) {
    return this.databaseService.albumService.addToFavs(id);
  }

  delAlbum(id: string) {
    return this.databaseService.albumService.delFromFavs(id);
  }

  setArtist(id: string) {
    return this.databaseService.artistService.addToFavs(id);
  }

  delArtist(id: string) {
    return this.databaseService.artistService.delFromFavs(id);
  }
}
