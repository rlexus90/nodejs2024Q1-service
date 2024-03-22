import { ArtistEntity } from 'src/database/entity/artistEntity';
import { AlbumEntity } from 'src/database/entity/albumEntity';
import { TrackEntity } from 'src/database/entity/trackEntity';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
