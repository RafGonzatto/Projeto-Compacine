import express from 'express'
import movieRoutes from './movie.routes'

const router = express.Router()

router.use('/api/v1/', movieRoutes)

export default router
