import express from 'express'
import movieRoutes from './movie.routes'
import sessionRoutes from './session.routes'

const router = express.Router()

router.use('/api/v1/', movieRoutes)
router.use('/api/v1/', sessionRoutes)

export default router
