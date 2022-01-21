import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CoreEntity } from './core.entity';
import { Movie } from './movie.entity';

@Entity()
export class Genre extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @ManyToMany(() => Movie, (movie) => movie.genres, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  movies: Movie[];
}
