import { DeleteResult } from 'typeorm'
import { Session } from '../models/session.model'

type createSessionRequest = {
  room: string
  capacity: number
  day: string
  time: string
  movie_id: number
}

// type updateSessionRequest = {
//   id: number
//   room?: string
//   capacity?: number
//   day?: string
//   time?: string
// }

type deleteSessionRequest = {
  id: number
  movie_id: number
}

export interface ISessionRepository {
  findById(id: number): Promise<Session | null>
  findRoomAndTime(room: string, time: string): Promise<Session | null>
  createSession(data: createSessionRequest): Promise<Session>
  saveSession(session: Session): Promise<Session>
  //updateSession(data: updateSessionRequest): Promise<Session>
  deleteSession(id: deleteSessionRequest): Promise<DeleteResult>
}
