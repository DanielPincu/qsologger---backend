import { Request, Response } from 'express'
import { registerUser, loginUser } from './auth.service'

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body
    const result = await registerUser(username, email, password)

    res.status(201).json({
      user: {
        id: result.user._id,
        username: result.user.username,
        email: result.user.email
      },
      token: result.token
    })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const result = await loginUser(email, password)

    res.json({
      user: {
        id: result.user._id,
        username: result.user.username,
        email: result.user.email
      },
      token: result.token
    })
  } catch (err: any) {
    res.status(401).json({ message: err.message })
  }
}