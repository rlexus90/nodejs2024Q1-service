import { Injectable } from '@nestjs/common';
import { Album } from 'src/types/album';
import { Artist } from 'src/types/artist';
import { Favorites } from 'src/types/favorites';
import { Track } from 'src/types/track';
import { User } from 'src/types/user';
import { DbTrackService } from './services/DBTrack.service';
import { DbUserService } from './services/DBUser.service';
import { DbArtistService } from './services/DBArtist.service';
import { DbAlbumService } from './services/DBAlbum.service';

@Injectable()
export class DatabaseService {
  public users: User[] = [];
  public tracks: Track[] = [];
  public artists: Artist[] = [];
  public albums: Album[] = [];
  public favorites: Favorites = {
    albums: [],
    tracks: [],
    artists: [],
  };

  constructor(
    public trackService: DbTrackService,
    public userService: DbUserService,
    public artistService: DbArtistService,
    public albumService: DbAlbumService,
  ) {}

  // public setFavsTrack = (id: string) => {
  //   this.favorites.tracks.push(id);
  // };

  // public delFavsTrack = (id: string) => {
  //   const index = this.favorites.tracks.findIndex((trackId) => trackId === id);

  //   if (index === -1) return false;

  //   this.favorites.tracks.splice(index, 1);
  //   return true;
  // };

  // public setFavsAlbum = (id: string) => {
  //   this.favorites.albums.push(id);
  // };

  // public delFavsAlbum = (id: string) => {
  //   const index = this.favorites.albums.findIndex((albumId) => albumId === id);

  //   if (index === -1) return false;

  //   this.favorites.albums.splice(index, 1);
  //   return true;
  // };

  // public setFavsArtist = (id: string) => {
  //   this.favorites.artists.push(id);
  // };

  // public delFavsArtist = (id: string) => {
  //   const index = this.favorites.artists.findIndex(
  //     (artistId) => artistId === id,
  //   );

  //   if (index === -1) return false;

  //   this.favorites.artists.splice(index, 1);
  //   return true;
  // };
}
