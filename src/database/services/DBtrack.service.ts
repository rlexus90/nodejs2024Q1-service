import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Track } from '@prisma/client';
import { UpdateTrackDto } from 'src/track/dto/updateTrackDto';

@Injectable()
export class DbTrackService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
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
      return track;
    } catch (e) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }

  async getById(id: string): Promise<Track | null> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    return track;
  }

  async delete(id: string) {
    return this.prisma.track.delete({ where: { id } });
  }
}
