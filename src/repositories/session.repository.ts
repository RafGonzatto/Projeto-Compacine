import AppDataSource from 'database/connection'
import { Session } from 'models/session.model'
import { ISessionRepository } from 'repositories.interfaces/session.repository.interface'
import { Repository } from 'typeorm'

class SessionRepository implements ISessionRepository {
  constructor(private repository: Repository<Session>) {
    this.repository = AppDataSource.getRepository(Session)
  }

  async saveSession(session: Session) {
    return await this.repository.save(session)
  }

  async findById(id: number) {
    const session = await this.repository.findOne({ where: { id } })

    return session
  }

  async createSession(data: {
    movie_id: number
    room: string
    capacity: number
    day: string
    time: string
  }) {
    const session = this.repository.create(data)

    return await this.saveSession(session)
  }

  async updateSession(data: {
    id: number
    room: string
    capacity: number
    day: string
    time: string
  }) {
    const { id, room, capacity, day, time } = data
    const session = await this.repository.findOne({
      where: { id },
    })

    session.room = room
    session.capacity = capacity
    session.day = day
    session.time = time

    return await this.saveSession(session)
  }

  async deleteSession(id: number): Promise<Session | null> {
    const session = await this.repository.findOne({ where: { id } })
    await this.repository.delete(id)

    return session
  }
}

export default SessionRepository
