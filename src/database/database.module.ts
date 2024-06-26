import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaModule } from './prisma/prisma.module';
import { DbTrackService } from './services/DBTrack.service';
import { DbUserService } from './services/DBUser.service';
import { DbArtistService } from './services/DBArtist.service';
import { DbAlbumService } from './services/DBAlbum.service';

@Module({
  providers: [
    DatabaseService,
    DbTrackService,
    DbUserService,
    DbArtistService,
    DbAlbumService,
  ],
  exports: [DatabaseService],
  imports: [PrismaModule],
})
export class DatabaseModule {}
