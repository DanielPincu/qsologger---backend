import express from 'express'
import cors from 'cors'
import { routes } from './router/routes'

function setupCors(app: express.Express) {
  const origins = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || origins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
}

export const createServer = () => {
  const app = express()
  setupCors(app)
  app.use(express.json())
  app.use('/', routes)
  return app
}