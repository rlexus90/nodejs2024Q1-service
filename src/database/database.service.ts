import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAlbumDto } from 'src/album/dto/updateAlbumDto';
import { UpdateArtistDto } from 'src/artist/dto/updateArtistDto';
import { UpdateTrackDto } from 'src/track/dto/updateTrackDto';
import { Album } from 'src/types/album';
import { Artist } from 'src/types/artist';
import { Track } from 'src/types/track';
import { User } from 'src/types/user';

@Injectable()
export class DatabaseService {
  public users: User[] = [];
  public tracks: Track[] = [];
  public artists: Artist[] = [];
  public albums: Album[] = [];

  public getUserId = (id: string): User | undefined => {
    const user = this.users.find((user) => user.id === id);
    return user;
  };

  public setUser = (user: User) => {
    this.users.push(user);
  };

  public delUser = (id: string) => {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    this.users.splice(index, 1);
  };

  public getTrackId = (id: string): Track | undefined => {
    const track = this.tracks.find((track) => track.id === id);
    return track;
  };

  public setTrack = (track: Track) => {
    this.tracks.push(track);
  };

  public updateTrack = (id: string, updateTrackDto: UpdateTrackDto) => {
    const index = this.tracks.findIndex((track) => track.id === id);

    if (index === -1)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);

    const newTrack: Track = { ...this.tracks[index], ...updateTrackDto };
    this.tracks[index] = newTrack;
    return newTrack;
  };

  public delTrack = (id: string) => {
    const index = this.tracks.findIndex((track) => track.id === id);

    if (index === -1)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    this.tracks.splice(index, 1);
  };

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
  };
}
