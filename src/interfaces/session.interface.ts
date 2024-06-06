//import { Ticket } from 'models/ticket.model'
export interface ISession {
  id: number
  movie_id: number
  room: string
  capacity: number
  day: string
  time: string
  //tickets: Ticket[]
}
