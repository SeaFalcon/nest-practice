import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CoreEntity } from './core.entity';
import { Movie } from './movie.entity';

@Entity()
export class Genre extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Movie, (movie) => movie.genres)
  movie: Movie;
}
