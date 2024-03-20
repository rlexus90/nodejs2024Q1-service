import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaModule } from './prisma/prisma.module';
import { DbTrackService } from './services/DBtrack.service';

@Module({
  providers: [DatabaseService, DbTrackService],
  exports: [DatabaseService],
  imports: [PrismaModule],
})
export class DatabaseModule {}
