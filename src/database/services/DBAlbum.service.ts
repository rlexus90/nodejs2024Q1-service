import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AlbumEntity } from '../entity/albumEntity';
import { Album } from 'src/types/album';
import { UpdateAlbumDto } from 'src/album/dto/updateAlbumDto';

@Injectable()
export class DbAlbumService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<AlbumEntity[]> {
    const albums = await this.prisma.album.findMany();
    return albums.map((album) => new AlbumEntity(album));
  }

  async set(album: Album) {
    await this.prisma.album.create({ data: album });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      const album = await this.prisma.album.update({
        where: { id },
        data: updateAlbumDto,
      });
      return new AlbumEntity(album);
    } catch (e) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }

  async getById(id: string): Promise<AlbumEntity | null> {
    const artist = await this.prisma.album.findUnique({ where: { id } });
    return new AlbumEntity(artist);
  }

  async delete(id: string) {
    return this.prisma.album.delete({ where: { id } });
  }
}
