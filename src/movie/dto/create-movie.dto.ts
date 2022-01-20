import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  genre: string;

  @IsOptional()
  description?: string;
}

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsNumber()
  year: number;

  @IsArray()
  genres: string[];
}
