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
    return artist ? new AlbumEntity(artist) : null;
  }

  async delete(id: string) {
    return this.prisma.album.delete({ where: { id } });
  }

  async returnFavs(): Promise<AlbumEntity[]> {
    return (
      await this.prisma.album.findMany({ where: { favorite: true } })
    ).map((album) => new AlbumEntity(album));
  }

  async addToFavs(id: string) {
    return this.prisma.album.update({
      where: { id },
      data: { favorite: true },
    });
  }

  async delFromFavs(id: string) {
    return this.prisma.album.update({
      where: { id, favorite: true },
      data: { favorite: false },
    });
  }
}
