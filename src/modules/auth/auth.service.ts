import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserByEmail, createUser } from '../user/user.service'
import { env } from '../../config/env'

export const registerUser = async (username: string, email: string, password: string) => {
  const existing = await getUserByEmail(email)
  if (existing) {
    throw new Error('Email already in use')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await createUser({
    username,
    email,
    password: hashedPassword
  })

  const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: '7d' })

  return { user, token }
}

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email)
  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: '7d' })

  return { user, token }
}