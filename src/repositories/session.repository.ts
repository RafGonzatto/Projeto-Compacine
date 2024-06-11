import AppDataSource from '../database/connection'
import { Session } from '../entitys/session.entity'
import { ISessionRepository } from '../repositories.interfaces/session.repository.interface'
import { DeleteResult, Not, Repository } from 'typeorm'

class SessionRepository implements ISessionRepository {
  private sessionRepository: Repository<Session>

  constructor() {
    this.sessionRepository = AppDataSource.getRepository(Session)
  }

  async listTickets() {
    return this.sessionRepository.find({ relations: ['Ticket'] })
  }

  async saveSession(session: Session) {
    return await this.sessionRepository.save(session)
  }

  async findRoom(room: string) {
    const session = await this.sessionRepository.findOne({
      where: { room },
    })
    return session
  }

  async findTime(time: string) {
    const session = await this.sessionRepository.findOne({
      where: { time },
    })

    return session
  }

  async findById(id: number) {
    const sessionId = await this.sessionRepository.findOne({
      where: { id: id },
    })

    return sessionId
  }

  async createSession(sessionData: {
    movie_id: number
    room: string
    capacity: number
    day: string
    time: string
  }) {
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

  async findConflictingSession(room: string, time: string, sessionId: number) {
    return await this.sessionRepository.findOne({
      where: {
        room,
        time,
        id: Not(sessionId),
      },
    })
  }
}

export default SessionRepository
