import { UserModel } from '../../models/user.model'

export const getUserByEmail = async (email: string) => {
  return UserModel.findOne({ email })
}

export const createUser = async (data: {
  callsign: string
  email: string
  password: string
}) => {
  return UserModel.create(data)
}