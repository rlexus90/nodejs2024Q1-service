import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDto } from './dto/createTrackDto';
import { Track } from 'src/types/track';
import * as uuid from 'uuid';
import { UpdateTrackDto } from './dto/updateTrackDto';

@Injectable()
export class TrackService {
  constructor(private databaseService: DatabaseService) {}

  returnAllTracks() {
    return this.databaseService.tracks;
  }

  returnTrackbyId(id: string) {
    const track = this.databaseService.getTrackId(id);
    if (!track)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    return track;
  }

  createTrack(createTrackDto: CreateTrackDto): Track {
    const track: Track = {
      ...createTrackDto,
      id: uuid.v4(),
    };
    this.databaseService.setTrack(track);
    return track;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    return this.databaseService.updateTrack(id, updateTrackDto);
  }

  delTrack(id: string) {
    this.databaseService.delTrack(id);
  }
}
