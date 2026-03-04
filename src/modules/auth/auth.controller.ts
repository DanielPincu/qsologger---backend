import { Request, Response } from 'express'
import { registerOperator, loginOperator } from './auth.service'

export const register = async (req: Request, res: Response) => {
  try {
    const { callsign, email, password, locator } = req.body
    if (!locator) {
      return res.status(400).json({ message: 'Maidenhead locator is required for registration' })
    }
    const result = await registerOperator(callsign, email, password, locator)

    res.status(201).json({
      operator: {
        id: result.operator._id,
        callsign: result.operator.callsign,
        email: result.operator.email
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
    const result = await loginOperator(email, password)

    res.json({
      operator: {
        id: result.operator._id,
        callsign: result.operator.callsign,
        email: result.operator.email
      },
      token: result.token
    })
  } catch (err: any) {
    res.status(401).json({ message: err.message })
  }
}