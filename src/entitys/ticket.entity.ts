import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Unique,
} from 'typeorm'
import { Session } from './session.entity'
import { ITicket } from '../interfaces/ticket.interface'

@Entity('Ticket')
@Unique(['session', 'chair'])
export class Ticket extends BaseEntity implements ITicket {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  session_id!: number

  @Column()
  chair!: string

  @Column()
  value!: number

  @ManyToOne(() => Session, (session) => session.tickets)
  @JoinColumn({ name: 'session_id' })
  session!: Session
}
