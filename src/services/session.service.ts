import { ISession } from '../interfaces/session.interface'
import { ISessionRepository } from '../repositories.interfaces/session.repository.interface'
import { inject, injectable } from 'tsyringe'
import createError from 'http-errors'
// import { ITicketRepository } from '../repositories.interfaces/ticket.repository.interface'

@injectable()
class SessionService {
  constructor(
    @inject('SessionRepository') private sessionRepository: ISessionRepository,
    // @inject('TicketRepository') private ticketRepository: ITicketRepository,
  ) {}

  async createSession(sessionData: {
    movie_id: number
    room: string
    capacity: number
    day: string
    time: string
  }): Promise<ISession> {
    const movie = await this.sessionRepository.findById(sessionData.movie_id)

    if (!movie) {
      throw new createError.NotFound('Movie does not exist')
    }

    const consultingSession = await this.sessionRepository.findRoomAndTime(
      sessionData.room,
      sessionData.time,
    )

    if (consultingSession) {
      throw new createError.Conflict('The session is already in use')
    }

    return this.sessionRepository.createSession(sessionData)
  }

  async updateSession(sessionData: {
    id: number
    room: string
    capacity: number
    day: string
    time: string
  }) {
    const verifySessionId = await this.sessionRepository.findById(
      sessionData.id,
    )

    if (!verifySessionId) {
      throw new createError.Conflict('The session does not exist')
    }

    const verifySession = await this.sessionRepository.findRoomAndTime(
      sessionData.room,
      sessionData.time,
    )

    if (!verifySession) {
      throw new createError.Conflict('The session is already in use')
    }

    return this.sessionRepository.updateSession(sessionData)
  }

  async deleteSession(sessionData: { id: number; movie_id: number }) {
    // const verifyTicket = await this.ticketRepository.findSession(sessionData.id)

    // if (verifyTicket > 0) {
    //   throw new createError.Conflict(
    //     'The session cannot be deleted with associated tickets',
    //   )
    // }

    return await this.sessionRepository.deleteSession(sessionData)
  }
}

export default SessionService
