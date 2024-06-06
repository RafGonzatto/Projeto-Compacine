import { ISession } from 'interfaces/session.interface'
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Movie } from './movie.model'
import { Ticket } from './ticket.model'

@Entity('Session')
export class Session extends BaseEntity implements ISession {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', unique: true })
  room!: string

  @Column({ type: 'integer'})
  capacity!: number

  @Column({ type: 'varchar', unique: true })
  day!: string

  @Column({ type: 'varchar', unique: true })
  time!: string

  @ManyToOne(() => Movie, (movie) => movie.sessions)
  movie!: Movie

  @OneToMany(() => Ticket, (ticket) => ticket.session)
  ticket!: Ticket
}
