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
  constructor(private trackService: TrackService) {}

  @Get('')
  getTracks(): Track[] {
    return this.trackService.returnAllTracks();
  }

  @Get(':id')
  getTrack(@Param('id', ParseUUIDPipe) id: string): Track {
    return this.trackService.returnTrackById(id);
  }

  @Post('')
  createTrack(@Body() createTrackDto: CreateTrackDto): Track {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  updateTrackId(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    this.trackService.delTrack(id);
  }
}
