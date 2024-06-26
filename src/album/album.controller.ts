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
  async getAlbum(): Promise<AlbumEntity[]> {
    return await this.albumService.returnAllAlbums();
  }

  @Get(':id')
  async getAlbumId(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AlbumEntity> {
    return await this.albumService.returnAlbumById(id);
  }

  @Post('')
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async updateArtistId(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    return await this.albumService.updateAlbum(id, updateAlbumDto);
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
