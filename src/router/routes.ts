import { Router } from 'express'
import authRoutes from '../modules/auth/auth.routes'


export const routes = Router()


//test route
routes.get('/ok', (req, res) => {
  res.json({ message: 'ok' })
})

//auth routes
routes.use('/operator', authRoutes)