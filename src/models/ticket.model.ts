import {
    Entity,
    Column,
    BaseEntity,
    ManyToOne,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    Unique,
  } from 'typeorm';
  //import { Session } from './Session';
  import { ITicket } from '../interfaces/ticket.interface';
  @Entity('Ticket')
  @Unique(['session', 'chair']) 
  export class Ticket extends BaseEntity  implements ITicket  {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    session_id!: number;
  
    @Column()
    chair!: string;
  
    @Column()
    value!: number;
  
    // @ManyToOne(() => Session, session => session.tickets)
    // session: Session;

   // @BeforeInsert()
   // @BeforeUpdate()
//     async checkUniqueChairPerSession() {
//       const ticket = await Ticket.findOne({
//         where: { session: this.session, chair: this.chair },
//       });
  
//       if (ticket) {
//         throw new Error('Chair already taken in this session');
//       }
//     }
   }
  