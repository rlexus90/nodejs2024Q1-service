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
import { ArtistService } from './artist.service';
import { Artist } from 'src/types/artist';
import { CreateArtistDto } from './dto/createArtistDto';
import { UpdateArtistDto } from './dto/updateArtistDto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get('')
  getArtist(): Artist[] {
    return this.artistService.returnAllArtists();
  }

  @Get(':id')
  getTArtistId(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.artistService.returnArtistById(id);
  }

  @Post('')
  createArtist(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  updateArtistId(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Artist {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    this.artistService.delArtist(id);
  }
}
