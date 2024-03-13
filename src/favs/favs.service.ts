import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { DatabaseService } from 'src/database/database.service';
import { TrackService } from 'src/track/track.service';
import { FavoritesResponse } from 'src/types/favorites';

@Injectable()
export class FavsService {
  constructor(
    private databaseService: DatabaseService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  returnFavs() {
    const favs: FavoritesResponse = {
      artists: this.databaseService.favorites.artists.map((id) =>
        this.artistService.returnArtistById(id),
      ),
      albums: this.databaseService.favorites.albums.map((id) =>
        this.albumService.returnAlbumById(id),
      ),
      tracks: this.databaseService.favorites.tracks.map((id) =>
        this.trackService.returnTrackById(id),
      ),
    };
    return favs;
  }

  setTrack(id: string) {
    const track = this.databaseService.getTrackId(id);
    if (!track)
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.databaseService.setFavsTrack(id);
  }

  delTrack(id: string) {
    const track = this.databaseService.getTrackId(id);
    if (!track)
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isSuccess = this.databaseService.delFavsTrack(id);
    if (!isSuccess)
      throw new HttpException(
        'This track is not favorite',
        HttpStatus.NOT_FOUND,
      );
  }

  setAlbum(id: string) {
    const album = this.databaseService.getAlbumId(id);
    if (!album)
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.databaseService.setFavsAlbum(id);
  }

  delAlbum(id: string) {
    const album = this.databaseService.getAlbumId(id);
    if (!album)
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isSuccess = this.databaseService.delFavsAlbum(id);
    if (!isSuccess)
      throw new HttpException(
        'This album is not favorite',
        HttpStatus.NOT_FOUND,
      );
  }

  setArtist(id: string) {
    const artist = this.databaseService.getArtistId(id);
    if (!artist)
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.databaseService.setFavsArtist(id);
  }

  delArtist(id: string) {
    const artist = this.databaseService.getArtistId(id);
    if (!artist)
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isSuccess = this.databaseService.delFavsArtist(id);
    if (!isSuccess)
      throw new HttpException(
        'This artist is not favorite',
        HttpStatus.NOT_FOUND,
      );
  }
}
