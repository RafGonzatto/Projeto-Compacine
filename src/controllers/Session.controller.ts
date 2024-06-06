import { Request, Response } from 'express'
import SessionService from 'services/session.service'
import { container } from 'tsyringe'

class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { room, capacity, day, time } = req.body
      const { movie_id } = req.params

      const service = container.resolve(SessionService)

      const session = await service.createSession({
        movie_id,
        room,
        capacity,
        day,
        time,
      })

      return res.status(201).json(session)
    } catch (error) {
      return res.status(500).json({ error: 'Error while creating sessions' })
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { movie_id, id } = req.params
      const { room, capacity, day, time } = req.body

      const service = container.resolve(SessionService)

      const session = await service.updateSession(id, movie_id, room, capacity, day, time)

      return res.status(200).json(session)
    } catch (error) {
      return res.status(500).json({ error: 'Error while updating sessions' })
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const service = container.resolve(SessionService)

      await service.deleteSession({ id })

      return res.status(204).json([])
    } catch (error) {
      return res.status(500).json({ error: 'Error while deleting sessions' })
    }
  }
}

export default SessionController
