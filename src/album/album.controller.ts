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
import { AlbumService } from './album.service';
import { Album } from 'src/types/album';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get('')
  getAlbum(): Album[] {
    return this.albumService.returnAllAlbums();
  }

  @Get(':id')
  getAlbumId(@Param('id', ParseUUIDPipe) id: string): Album {
    return this.albumService.returnAlbumById(id);
  }

  @Post('')
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Album {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  updateArtistId(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Album {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  ddeleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    this.albumService.delAlbum(id);
  }
}
