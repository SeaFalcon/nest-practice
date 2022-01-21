import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToMany(() => Genre, (genre) => genre.movies, {
    onDelete: 'CASCADE',
  })
  genres: Genre[];
}
