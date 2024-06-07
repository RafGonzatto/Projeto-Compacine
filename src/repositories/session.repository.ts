import AppDataSource from '../database/connection'
import { Session } from '../models/session.model'
import { ISessionRepository } from '../repositories.interfaces/session.repository.interface'
import { DeleteResult, Repository } from 'typeorm'

class SessionRepository implements ISessionRepository {
  constructor(private repository: Repository<Session>) {
    this.repository = AppDataSource.getRepository(Session)
  }

  async saveSession(session: Session) {
    return await this.repository.save(session)
  }

  async findRoomAndTime(room: string, time: string) {
    const session = await this.repository.findOne({ where: { room, time } })
    return session
  }

  async findById(id: number) {
    const session = await this.repository.findOne({ where: { id: id } })

    return session
  }

  async createSession(sessionData: {
    movie_id: number
    room: string
    capacity: number
    day: string
    time: string
  }): Promise<Session> {
    const { movie_id, room, capacity, day, time } = sessionData

    const session = this.repository.create({
      movie_id: movie_id,
      room: room,
      capacity: capacity,
      day: day,
      time: time,
    })

    return await this.saveSession(session)
  }

  // async updateSession(data: {}){}
  //   id: number
  //   room: string
  //   capacity: number
  //   day: string
  //   time: string
  // }) {
  //   const { id, room, capacity, day, time } = data
  //   const session = await this.repository.findOne({
  //     where: { id },
  //   })

  //   session.room = room
  //   session.capacity = capacity
  //   session.day = day
  //   session.time = time

  //   return await this.saveSession(session)
  //}

  async deleteSession(sessionData: {
    id: number
    movie_id: number
  }): Promise<DeleteResult> {
    return await this.repository.delete({
      id: sessionData.id,
      movie_id: sessionData.movie_id,
    })
  }
}

export default SessionRepository
