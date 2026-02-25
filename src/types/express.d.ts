import 'express'

declare global {
  namespace Express {
    interface Request {
      operatorId: string
    }
  }
}

export {}