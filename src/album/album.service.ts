import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { Album } from 'src/types/album';
import * as uuid from 'uuid';
import { UpdateAlbumDto } from './dto/updateAlbumDto';

@Injectable()
export class AlbumService {
  constructor(private databaseService: DatabaseService) {}

  returnAllAlbums() {
    return this.databaseService.albums;
  }

  returnAlbumById(id: string) {
    const album = this.databaseService.getAlbumId(id);
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    return album;
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Album {
    const album: Album = {
      ...createAlbumDto,
      id: uuid.v4(),
    };

    this.databaseService.setAlbum(album);
    return album;
  }

  updateAlbum(id: string, updateAlbumDTO: UpdateAlbumDto) {
    return this.databaseService.updateAlbum(id, updateAlbumDTO);
  }

  delAlbum(id: string) {
    this.databaseService.delAlbum(id);
  }
}
