import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) return res.status(401).json({ message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { operatorId: string }
    req.operatorId = decoded.operatorId
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}