import express from 'express'
import movieRoutes from './movie.routes'
import sessionRoutes from './session.routes'
import ticketRoutes from './ticket.routes'

const router = express.Router()

router.use('/api/v1/', movieRoutes)
router.use('/api/v1/', sessionRoutes)
router.use('/api/v1/', ticketRoutes)

export default router
