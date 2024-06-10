import { ISession } from '../interfaces/session.interface'
import { ISessionRepository } from '../repositories.interfaces/session.repository.interface'
import IMovieRepository from '../repositories.interfaces/movie.repository.interface'
import { inject, injectable } from 'tsyringe'
import createError from 'http-errors'
import { ITicketRepository } from '../repositories.interfaces/ticket.repository.interface'
import { Session } from '../entitys/session.entity'

@injectable()
class SessionService {
  constructor(
    @inject('SessionRepository') private sessionRepository: ISessionRepository,
    @inject('TicketRepository') private ticketRepository: ITicketRepository,
  ) {}

  async createSession(sessionData: {
    movie_id: number
    room: string
    capacity: number
    day: string
    time: string
  }): Promise<ISession> {
    // const movie = await this.sessionRepository.findById(sessionData.movie_id)

    // if (!movie) {
    //   throw new createError.NotFound('Movie does not exist')
    // }

    const consultingRoom = await this.sessionRepository.findRoom(
      sessionData.room,
    )

    const consultingTime = await this.sessionRepository.findTime(
      sessionData.time,
    )

    if (consultingTime && consultingRoom) {
      throw new createError.Conflict('The session is already in use')
    }

    return this.sessionRepository.createSession(sessionData)
  }

  async updateSession(sessionData: {
    id: number
    movie_id: number
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

    const consultingRoom = await this.sessionRepository.findRoom(
      sessionData.room,
    )

    const consultingTime = await this.sessionRepository.findTime(
      sessionData.time,
    )

    if (consultingTime && consultingRoom) {
      throw new createError.Conflict('The session is already in use')
    }

    const updateSession = new Session()
    updateSession.id = sessionData.id
    updateSession.movie_id = sessionData.movie_id
    updateSession.room = sessionData.room
    updateSession.capacity = sessionData.capacity
    updateSession.day = sessionData.day
    updateSession.time = sessionData.time

    return this.sessionRepository.updateSession(updateSession)
  }

  async deleteSession(sessionData: { id: number; movie_id: number }) {
    return await this.sessionRepository.deleteSession(sessionData)
  }
}

export default SessionService
