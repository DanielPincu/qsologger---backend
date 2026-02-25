import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getOperatorByEmail, createOperator } from '../operator/operator.service'
import { env } from '../../config/env'

export const registerOperator = async (callsign: string, email: string, password: string) => {
  const existing = await getOperatorByEmail(email)
  if (existing) {
    throw new Error('Email already in use')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const operator = await createOperator({
    callsign,
    email,
    password: hashedPassword
  })

  const token = jwt.sign({ operatorId: operator._id }, env.JWT_SECRET, { expiresIn: '7d' })

  return { operator, token }
}

export const loginOperator = async (email: string, password: string) => {
  const operator = await getOperatorByEmail(email)
  if (!operator) {
    throw new Error('Invalid credentials')
  }

  const isMatch = await bcrypt.compare(password, operator.password)
  if (!isMatch) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign({ operatorId: operator._id }, env.JWT_SECRET, { expiresIn: '7d' })

  return { operator, token }
}