import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from 'src/types/track';
import { CreateTrackDto } from './dto/createTrackDto';
import { UpdateTrackDto } from './dto/updateTrackDto';

@Controller('track')
export class TrackController {
  constructor(private trackServise: TrackService) {}

  @Get('')
  getTracks(): Track[] {
    return this.trackServise.returnAllTracks();
  }

  @Get(':id')
  getTrack(@Param('id', ParseUUIDPipe) id: string): Track {
    return this.trackServise.returnTrackbyId(id);
  }

  @Post('')
  createTrack(@Body() createTrackDto: CreateTrackDto): Track {
    return this.trackServise.createTrack(createTrackDto);
  }

  @Put(':id')
  updateTrackId(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    return this.trackServise.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    this.trackServise.delTrack(id);
  }
}
