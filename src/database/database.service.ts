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
}
