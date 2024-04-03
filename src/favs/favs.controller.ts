import {
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
  UseInterceptors,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesResponse } from 'src/types/favorites';

@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get('')
  async getFavs(): Promise<FavoritesResponse> {
    return await this.favsService.returnFavs();
  }

  @Post('track/:id')
  async setTrackToFavs(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favsService.setTrack(id);
    } catch {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  async delTrackFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favsService.delTrack(id);
    } catch {
      throw new HttpException(
        'This track is not favorite',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('album/:id')
  async setAlbumToFavs(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favsService.setAlbum(id);
    } catch {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  async delAlbumFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favsService.delAlbum(id);
    } catch {
      throw new HttpException(
        'This album is not favorite',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('artist/:id')
  async setArtistToFavs(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favsService.setArtist(id);
    } catch {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async delArtistFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favsService.delArtist(id);
    } catch {
      throw new HttpException(
        'This artist is not favorite',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
