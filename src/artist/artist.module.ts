import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
  imports: [DatabaseModule],
})
export class ArtistModule {}
