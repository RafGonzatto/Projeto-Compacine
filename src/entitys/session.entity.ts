import { ISession } from 'interfaces/session.interface'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Movie } from './movie.entity'
import { Ticket } from './ticket.entity'

@Entity('Session')
export class Session extends BaseEntity implements ISession {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'integer' })
  movie_id!: number

  @Column({ type: 'varchar', unique: true })
  room!: string

  @Column({ type: 'integer' })
  capacity!: number

  @Column({ type: 'varchar', unique: true })
  day!: string

  @Column({ type: 'varchar', unique: true })
  time!: string

  @ManyToOne(() => Movie, (movie) => movie.sessions)
  @JoinColumn({ name: 'movie_id' })
  movie!: Movie

  @OneToMany(() => Ticket, (ticket) => ticket.session)
  ticket!: Ticket[]
}
