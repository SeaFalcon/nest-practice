import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from '../../../node_modules/.staging/typeorm-025d8f9e/browser/decorator/columns/Column';
import { CoreEntity } from './core.entity';
import { Genre } from './genre.entity';

@Entity()
export class Movie extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year: string;

  @OneToMany(() => Genre, (genre) => genre.movie)
  genres: Genre[];
}
