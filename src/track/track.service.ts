import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDto } from './dto/createTrackDto';
import { Track } from 'src/types/track';
import * as uuid from 'uuid';
import { UpdateTrackDto } from './dto/updateTrackDto';

@Injectable()
export class TrackService {
  constructor(private databaseService: DatabaseService) {}

  async returnAllTracks(): Promise<Track[]> {
    return this.databaseService.trackService.getAll();
  }

  async returnTrackById(id: string): Promise<Track> {
    const track = await this.databaseService.trackService.getById(id);
    if (!track)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const track: Track = {
      ...createTrackDto,
      id: uuid.v4(),
    };
    await this.databaseService.trackService.set(track);
    return track;
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    return this.databaseService.trackService.update(id, updateTrackDto);
  }

  async delTrack(id: string) {
    return this.databaseService.trackService.delete(id);
  }
}
