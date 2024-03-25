import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTrackDto } from 'src/track/dto/updateTrackDto';
import { TrackEntity } from '../entity/trackEntity';
import { Track } from 'src/types/track';

@Injectable()
export class DbTrackService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<TrackEntity[]> {
    const tracks = await this.prisma.track.findMany();
    return tracks.map((track) => new TrackEntity(track));
  }

  async set(track: Track) {
    await this.prisma.track.create({ data: track });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      const track = await this.prisma.track.update({
        where: { id },
        data: updateTrackDto,
      });
      return new TrackEntity(track);
    } catch (e) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }

  async getById(id: string): Promise<TrackEntity | null> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    return track ? new TrackEntity(track) : null;
  }

  async delete(id: string) {
    return this.prisma.track.delete({ where: { id } });
  }

  async returnFavs(): Promise<TrackEntity[]> {
    return (
      await this.prisma.track.findMany({ where: { favorite: true } })
    ).map((track) => new TrackEntity(track));
  }

  async addToFavs(id: string) {
    return this.prisma.track.update({
      where: { id },
      data: { favorite: true },
    });
  }

  async delFromFavs(id: string) {
    return this.prisma.track.update({
      where: { id, favorite: true },
      data: { favorite: false },
    });
  }
}
