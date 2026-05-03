import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export const env = (() => {
  const NODE_ENV = process.env.NODE_ENV || 'development'

  const MONGO_URI = (() => {
    if (NODE_ENV === 'production') {
      if (!process.env.MONGO_URI_PROD) {
        throw new Error('MONGO_URI_PROD is required in production')
      }
      return process.env.MONGO_URI_PROD
    }

    if (NODE_ENV === 'development') {
      if (!process.env.MONGO_URI_DEV) {
        throw new Error('MONGO_URI_DEV is required in development')
      }
      return process.env.MONGO_URI_DEV
    }


    throw new Error(`Unsupported NODE_ENV for DB config: ${NODE_ENV}`)
  })()

  const JWT_SECRET = (() => {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is required in all environments')
    }
    return process.env.JWT_SECRET
  })()

  return {
    NODE_ENV,
    PORT: Number(process.env.PORT || 3000),
    MONGO_URI,
    JWT_SECRET,
  }
})()