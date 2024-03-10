import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateTrackDto } from 'src/track/dto/updateTrackDto';
import { Track } from 'src/types/track';
import { User } from 'src/types/user';

@Injectable()
export class DatabaseService {
  public users: User[] = [];
  public tracks: Track[] = [];

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
      throw new HttpException('Tracknot found', HttpStatus.NOT_FOUND);

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
}
