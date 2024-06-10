import AppDataSource from '../database/connection'
import { Session } from '../models/session.model'
import { ISessionRepository } from '../repositories.interfaces/session.repository.interface'
import { DeleteResult, Repository } from 'typeorm'

class SessionRepository implements ISessionRepository {
  private sessionRepository: Repository<Session>

  constructor() {
    this.sessionRepository = AppDataSource.getRepository(Session)
  }

  async saveSession(session: Session) {
    return await this.sessionRepository.save(session)
  }

  async findRoomAndTime(room: string, time: string) {
    const session = await this.sessionRepository.findOne({
      where: { room, time },
    })
    return session
  }

  async findById(id: number) {
    const session = await this.sessionRepository.findOne({ where: { id: id } })

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

    const session = this.sessionRepository.create({
      movie_id: movie_id,
      room: room,
      capacity: capacity,
      day: day,
      time: time,
    })

    return await this.saveSession(session)
  }

  async updateSession(sessionData: {
    id: number
    room: string
    capacity: number
    day: string
    time: string
  }): Promise<Session> {
    const { id, room, capacity, day, time } = sessionData

    const session = await this.sessionRepository.findOne({
      where: { id: id },
    })

    if (!session) {
      throw new Error('Session does not exist')
    }

    session.room = room
    session.capacity = capacity
    session.day = day
    session.time = time

    return await this.sessionRepository.save(session)
  }

  async deleteSession(sessionData: {
    id: number
    movie_id: number
  }): Promise<DeleteResult> {
    return await this.sessionRepository.delete({
      id: sessionData.id,
      movie_id: sessionData.movie_id,
    })
  }
}

export default SessionRepository
