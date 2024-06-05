import {
  Entity,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
//import { Session } from './Session';
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

  @BeforeInsert()
  @BeforeUpdate()
  validateDescriptionLength() {
    if (this.description.length > 100) {
      throw new Error('A descrição do filme não pode exceder 100 caracteres')
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  formatReleaseDate() {
    this.release_date = new Date(this.release_date)
  }

  toClientFormat() {
    return {
      ...this,
      release_date: new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(this.release_date),
    }
  }
}
