import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto, CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Genre } from './entities/genre.entity';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movies: Repository<Movie>,

    @InjectRepository(Genre)
    private readonly genres: Repository<Genre>,
  ) {}
  async create({ title, year, genres }: CreateMovieDto) {
    const newMovie = this.movies.create({ title, year });
    await this.movies.save(newMovie);

    for (const genre of genres) {
      const newGenre = await this.createGenre({ genre });

      newGenre.movie = newMovie;
      await this.genres.save(newGenre);
    }

    return {
      success: true,
      newMovie,
    };
  }

  findAll() {
    return this.movies.find({ relations: ['genres'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }

  async createGenre({ genre, description }: CreateGenreDto): Promise<Genre> {
    const existingGenre = await this.findGenreByName(genre);

    if (existingGenre) {
      return existingGenre;
    }

    const newGenre = this.genres.create({ name: genre, description });
    await this.genres.save(newGenre);

    return newGenre;
  }

  findGenreByName(name: string): Promise<Genre> {
    return this.genres.findOne({ where: { name } });
  }
}
