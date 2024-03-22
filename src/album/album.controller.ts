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
import { AlbumService } from './album.service';
import { Album } from 'src/types/album';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';
import { AlbumEntity } from 'src/database/entity/albumEntity';

@Controller('album')
@UseInterceptors(ClassSerializerInterceptor)
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get('')
  getAlbum(): Promise<AlbumEntity[]> {
    return this.albumService.returnAllAlbums();
  }

  @Get(':id')
  getAlbumId(@Param('id', ParseUUIDPipe) id: string): Promise<AlbumEntity> {
    return this.albumService.returnAlbumById(id);
  }

  @Post('')
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  updateArtistId(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.albumService.delAlbum(id);
    } catch {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
