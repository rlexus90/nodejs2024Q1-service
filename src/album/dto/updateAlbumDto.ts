import { IsString, IsInt, ValidateIf } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}
