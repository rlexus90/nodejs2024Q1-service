import { Injectable } from '@nestjs/common';
import { DbTrackService } from './services/DBTrack.service';
import { DbUserService } from './services/DBUser.service';
import { DbArtistService } from './services/DBArtist.service';
import { DbAlbumService } from './services/DBAlbum.service';

@Injectable()
export class DatabaseService {
  constructor(
    public trackService: DbTrackService,
    public userService: DbUserService,
    public artistService: DbArtistService,
    public albumService: DbAlbumService,
  ) {}
}
