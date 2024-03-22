import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateArtistDto } from 'src/artist/dto/updateArtistDto';
import { ArtistEntity } from '../entity/artistEntity';
import { Artist } from 'src/types/artist';

@Injectable()
export class DbArtistService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<ArtistEntity[]> {
    const artists = await this.prisma.artist.findMany();
    return artists.map((artist) => new ArtistEntity(artist));
  }

  async set(artist: Artist) {
    await this.prisma.artist.create({ data: artist });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      const artist = await this.prisma.artist.update({
        where: { id },
        data: updateArtistDto,
      });
      return new ArtistEntity(artist);
    } catch (e) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }

  async getById(id: string): Promise<ArtistEntity | null> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    return new ArtistEntity(artist);
  }

  async delete(id: string) {
    return this.prisma.artist.delete({ where: { id } });
  }
}
