import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  Unique,
} from 'typeorm'
import { Session } from './session.model'
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

  @ManyToOne(() => Session, (session) => session.ticket)
  @JoinColumn({ name: 'session_id' })
  session!: Session
}
