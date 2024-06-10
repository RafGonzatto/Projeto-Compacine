//import { Ticket } from '../models/ticket.entity.ts'
export interface ISession {
  id: number
  movie_id: number
  room: string
  capacity: number
  day: string
  time: string
  //tickets: Ticket[]
}
