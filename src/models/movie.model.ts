import {
  Entity,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { IMovie } from '../interfaces/movie.interface'
import { Session } from './session.model'

@Entity('Movie')
export class Movie extends BaseEntity implements IMovie {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 255 })
  image!: string

  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string

  @Column({ type: 'varchar', length: 100 })
  description!: string

  @Column('simple-array')
  actors!: string[]

  @Column({ type: 'varchar', length: 50 })
  genre!: string

  @Column({ type: 'datetime' })
  release_date!: Date

  @OneToMany(() => Session, (session) => session.movie)
  sessions!: Session[]
}
