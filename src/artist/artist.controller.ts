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
import { ArtistService } from './artist.service';
import { Artist } from 'src/types/artist';
import { CreateArtistDto } from './dto/createArtistDto';
import { UpdateArtistDto } from './dto/updateArtistDto';
import { ArtistEntity } from 'src/database/entity/artistEntity';

@Controller('artist')
@UseInterceptors(ClassSerializerInterceptor)
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get('')
  getArtist(): Promise<ArtistEntity[]> {
    return this.artistService.returnAllArtists();
  }

  @Get(':id')
  getTArtistId(@Param('id', ParseUUIDPipe) id: string): Promise<ArtistEntity> {
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
  ): Promise<ArtistEntity> {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.artistService.delArtist(id);
    } catch {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
