import mongoose from 'mongoose'
import { env } from '../config/env'

export const connectMongo = async () => {
  if (!env.MONGO_URI) {
    console.warn('MONGO_URI not set')
    return
  }

  await mongoose.connect(env.MONGO_URI)
  console.log('Mongo connected')
}