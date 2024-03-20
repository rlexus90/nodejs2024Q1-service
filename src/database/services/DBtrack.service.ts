import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DbTrackService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    console.log(1);
    return await this.prisma.track.findMany();
  }
}
