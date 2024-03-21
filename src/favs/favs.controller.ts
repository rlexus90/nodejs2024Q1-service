import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesResponse } from 'src/types/favorites';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get('')
  getFavs(): Promise<FavoritesResponse> {
    return this.favsService.returnFavs();
  }

  @Post('track/:id')
  setTrackToFavs(@Param('id', ParseUUIDPipe) id: string) {
    this.favsService.setTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  delTrackFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    this.favsService.delTrack(id);
  }

  @Post('album/:id')
  setAlbumToFavs(@Param('id', ParseUUIDPipe) id: string) {
    this.favsService.setAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  delAlbumFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    this.favsService.delAlbum(id);
  }

  @Post('artist/:id')
  setArtistToFavs(@Param('id', ParseUUIDPipe) id: string) {
    this.favsService.setArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  delArtistFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    this.favsService.delArtist(id);
  }
}
