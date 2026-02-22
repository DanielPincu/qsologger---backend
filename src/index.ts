import { createServer } from './server'
import { connectMongo } from './driver/mongo.driver'
import { env } from './config/env'

const start = async () => {
  await connectMongo()
  const app = createServer()
  app.listen(env.PORT, () => {
    console.log(`API running on http://localhost:${env.PORT}`)
  })
}

start()