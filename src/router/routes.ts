import { Router } from 'express'
import authRoutes from '../modules/auth/auth.routes'
import qsoRoutes from '../modules/qso/qso.routes'


export const routes = Router()


//test route
routes.get('/ok', (req, res) => {
  res.json({ message: 'ok' })
})

//auth routes
routes.use('/operator', authRoutes)

//qso routes
routes.use('/qso', qsoRoutes)