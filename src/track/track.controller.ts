import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from 'src/types/track';
import { CreateTrackDto } from './dto/createTrackDto';
import { UpdateTrackDto } from './dto/updateTrackDto';

@Controller('track')
@UseInterceptors(ClassSerializerInterceptor)
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get('')
  async getTracks(): Promise<Track[]> {
    return await this.trackService.returnAllTracks();
  }

  @Get(':id')
  async getTrack(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    return await this.trackService.returnTrackById(id);
  }

  @Post('')
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  async updateTrackId(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return await this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.trackService.delTrack(id);
    } catch {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }
}
