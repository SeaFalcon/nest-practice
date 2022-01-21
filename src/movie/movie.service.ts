import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto, CreateMovieDto } from './dto/create-movie.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
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

      newGenre.movies = [newMovie];
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
    return this.movies.findOneOrFail(id);
  }

  async update(id: number, { title, year, genres }: UpdateMovieDto) {
    const willBeUpdatedMovie = await this.findOne(id);

    willBeUpdatedMovie.title = title ? title : willBeUpdatedMovie.title;
    willBeUpdatedMovie.year = year ? year : willBeUpdatedMovie.year;

    if (genres) {
      const genreEntities = [];
      for (const genre of genres) {
        const newGenre = await this.createGenre({ genre });
        genreEntities.push(newGenre);
      }
      willBeUpdatedMovie.genres = genreEntities;
    }

    return this.movies.save(willBeUpdatedMovie);
  }

  remove(id: number) {
    return this.movies.delete(id);
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

  findGenreById(id: number): Promise<Genre> {
    return this.genres.findOneOrFail(id);
  }

  getGenres() {
    return this.genres.find();
  }

  async updateGenreById(id: number, { name, description }: UpdateGenreDto) {
    const genre = await this.findGenreById(id);

    genre.name = name ? name : genre.name;
    genre.description = description ? description : genre.description;

    await this.genres.save(genre);

    return 'update genre success!';
  }

  deleteGenre(id: number) {
    this.genres.delete({ id });
  }
}
