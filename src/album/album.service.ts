import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { Album } from 'src/types/album';
import * as uuid from 'uuid';
import { UpdateAlbumDto } from './dto/updateAlbumDto';

@Injectable()
export class AlbumService {
  constructor(private databaseService: DatabaseService) {}

  async returnAllAlbums() {
    return this.databaseService.albumService.getAll();
  }

  async returnAlbumById(id: string) {
    const album = await this.databaseService.albumService.getById(id);
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album: Album = {
      ...createAlbumDto,
      id: uuid.v4(),
    };

    await this.databaseService.albumService.set(album);
    return album;
  }

  async updateAlbum(id: string, updateAlbumDTO: UpdateAlbumDto) {
    return this.databaseService.albumService.update(id, updateAlbumDTO);
  }

  async delAlbum(id: string) {
    return this.databaseService.albumService.delete(id);
  }
}
