import { Router } from 'express'


export const routes = Router()


//test route
routes.get('/ok', (req, res) => {
  res.json({ message: 'ok' })
})