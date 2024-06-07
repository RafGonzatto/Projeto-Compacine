import { Request, Response } from 'express'
import SessionService from '../services/session.service'
import { container } from 'tsyringe'
//import { CreateHttpError } from 'http-errors'

class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { room, capacity, day, time } = req.body
      const movie_id = parseInt(req.params.movie_id)

      const service = container.resolve(SessionService)

      const session = await service.createSession({
        movie_id,
        room,
        capacity,
        day,
        time,
      })

      return res.status(201).json(session)
    } catch (error: any) {
      if (error && error.status) {
        return res
          .status(error.status)
          .json({ code: error.status, message: error.message })
      } else {
        return res
          .status(500)
          .json({ code: 500, error: error.message.toString() })
      }
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id)
      const { room, capacity, day, time } = req.body

      const service = container.resolve(SessionService)

      const session = await service.updateSession({
        id,
        room,
        capacity,
        day,
        time,
      })

      return res.status(200).json(session)
    } catch (error: any) {
      if (error && error.status) {
        return res
          .status(error.status)
          .json({ code: error.status, message: error.message })
      } else {
        return res
          .status(500)
          .json({ code: 500, error: error.message.toString() })
      }
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id)
      const movie_id = parseInt(req.params.movie_id)

      const service = container.resolve(SessionService)

      await service.deleteSession({ id, movie_id })

      return res.status(204).json([])
    } catch (error: any) {
      if (error && error.status) {
        return res
          .status(error.status)
          .json({ code: error.status, message: error.message })
      } else {
        return res
          .status(500)
          .json({ code: 500, error: error.message.toString() })
      }
    }
  }
}

export default SessionController
