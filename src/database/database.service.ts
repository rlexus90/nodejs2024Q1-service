import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAlbumDto } from 'src/album/dto/updateAlbumDto';
import { UpdateArtistDto } from 'src/artist/dto/updateArtistDto';
import { Album } from 'src/types/album';
import { Artist } from 'src/types/artist';
import { Favorites } from 'src/types/favorites';
import { Track } from 'src/types/track';
import { User } from 'src/types/user';
import { DbTrackService } from './services/DBTrack.service';
import { DbUserService } from './services/DBUser.service';

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
  ) {}

  // public getUserId = (id: string): User | undefined => {
  //   const user = this.users.find((user) => user.id === id);
  //   return user;
  // };

  // public setUser = (user: User) => {
  //   this.users.push(user);
  // };

  // public delUser = (id: string) => {
  //   const index = this.users.findIndex((user) => user.id === id);

  //   if (index === -1)
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   this.users.splice(index, 1);
  // };

  public getArtistId = (id: string): Artist | undefined => {
    const artist = this.artists.find((artist) => artist.id === id);
    return artist;
  };

  public setArtist = (artist: Artist) => {
    this.artists.push(artist);
  };

  public delArtist = (id: string) => {
    const index = this.artists.findIndex((artist) => artist.id === id);

    if (index === -1)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    this.artists.splice(index, 1);

    this.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });

    this.albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });

    this.delFavsArtist(id);
  };

  public updateArtist = (id: string, updateArtistDto: UpdateArtistDto) => {
    const index = this.artists.findIndex((artist) => artist.id === id);

    if (index === -1)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);

    const newArtist: Artist = { ...this.artists[index], ...updateArtistDto };
    this.artists[index] = newArtist;
    return newArtist;
  };

  public getAlbumId = (id: string): Album | undefined => {
    const album = this.albums.find((album) => album.id === id);
    return album;
  };

  public setAlbum = (album: Album) => {
    this.albums.push(album);
  };

  public updateAlbum = (id: string, updateAlbumDTO: UpdateAlbumDto) => {
    const index = this.albums.findIndex((album) => album.id === id);

    if (index === -1)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);

    const newAlbum: Album = { ...this.albums[index], ...updateAlbumDTO };
    this.albums[index] = newAlbum;
    return newAlbum;
  };

  public delAlbum = (id: string) => {
    const index = this.albums.findIndex((album) => album.id === id);

    if (index === -1)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    this.albums.splice(index, 1);

    this.tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });

    this.delFavsAlbum(id);
  };

  public setFavsTrack = (id: string) => {
    this.favorites.tracks.push(id);
  };

  public delFavsTrack = (id: string) => {
    const index = this.favorites.tracks.findIndex((trackId) => trackId === id);

    if (index === -1) return false;

    this.favorites.tracks.splice(index, 1);
    return true;
  };

  public setFavsAlbum = (id: string) => {
    this.favorites.albums.push(id);
  };

  public delFavsAlbum = (id: string) => {
    const index = this.favorites.albums.findIndex((albumId) => albumId === id);

    if (index === -1) return false;

    this.favorites.albums.splice(index, 1);
    return true;
  };

  public setFavsArtist = (id: string) => {
    this.favorites.artists.push(id);
  };

  public delFavsArtist = (id: string) => {
    const index = this.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (index === -1) return false;

    this.favorites.artists.splice(index, 1);
    return true;
  };
}
