import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CoreEntity } from './core.entity';
import { Genre } from './genre.entity';

@Entity()
export class Movie extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year: number;

  @OneToMany(() => Genre, (genre) => genre.movie)
  genres: Genre[];
}
