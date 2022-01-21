import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateGenreDto, CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.movieService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.movieService.remove(id);
  }

  @Post('/genre')
  createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.movieService.createGenre(createGenreDto);
  }

  @Get('/genre')
  getGenres() {
    return this.movieService.getGenres();
  }

  @Get('/genre/:id')
  findGenreById(@Param('id') id: number) {
    return this.movieService.findGenreById(id);
  }

  @Put('/genre/:id')
  updateGenreById(@Param('id') id: number, @Body() data: UpdateGenreDto) {
    return this.movieService.updateGenreById(id, data);
  }
}
