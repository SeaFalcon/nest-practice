import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsArray()
  @IsOptional()
  genres?: string[];
}
