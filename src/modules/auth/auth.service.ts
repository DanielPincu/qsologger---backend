import jwt from 'jsonwebtoken'
import { env } from '../../config/env'
import { OperatorModel } from '../../models/operator.model'
import { hashPassword, comparePassword } from '../../utils/passwordHasher.util'

const getOperatorByEmail = async (email: string) => {
  return OperatorModel.findOne({ email })
}

const createOperator = async (data: {
  callsign: string
  email: string
  password: string
  locator: string
}) => {
  return OperatorModel.create(data)
}

export const registerOperator = async (callsign: string, email: string, password: string, locator: string) => {
  const existing = await getOperatorByEmail(email)
  if (existing) {
    throw new Error('Email already in use')
  }

  const hashedPassword = await hashPassword(password)

  const operator = await createOperator({
    callsign,
    email,
    password: hashedPassword,
    locator
  })

  const token = jwt.sign({ operatorId: operator._id }, env.JWT_SECRET, { expiresIn: '7d' })

  return { operator, token }
}

export const loginOperator = async (email: string, password: string) => {
  const operator = await getOperatorByEmail(email)
  if (!operator) {
    throw new Error('Invalid credentials')
  }

  const isMatch = await comparePassword(password, operator.password)
  if (!isMatch) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign({ operatorId: operator._id }, env.JWT_SECRET, { expiresIn: '7d' })

  return { operator, token }
}