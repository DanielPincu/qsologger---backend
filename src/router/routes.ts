import { Router } from 'express'
import authRoutes from '../modules/auth/auth.routes'
import qsoRoutes from '../modules/qso/qso.routes'
import operatorRoutes from '../modules/operator/operator.routes'


export const routes = Router()


//test route
routes.get('/ok', (req, res) => {
  res.json({ message: 'ok' })
})

//auth routes
routes.use('/auth', authRoutes)

//qso routes
routes.use('/qso', qsoRoutes)

//operator routes
routes.use('/operator', operatorRoutes)