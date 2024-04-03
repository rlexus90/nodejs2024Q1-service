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
  async getArtist(): Promise<ArtistEntity[]> {
    return await this.artistService.returnAllArtists();
  }

  @Get(':id')
  async getTArtistId(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArtistEntity> {
    return await this.artistService.returnArtistById(id);
  }

  @Post('')
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return await this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  async updateArtistId(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    return await this.artistService.updateArtist(id, updateArtistDto);
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
