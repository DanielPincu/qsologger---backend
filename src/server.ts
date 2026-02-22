import express from 'express'
import cors from 'cors'
import { routes } from './router/routes'

export const createServer = () => {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use('/', routes)
  return app
}