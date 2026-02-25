import { OperatorModel } from '../../models/operator.model'
import { QSOModel } from '../../models/qso.model'
import { hashPassword, comparePassword } from '../../utils/passwordHasher.util'

export const getMe = async (operatorId: string) => {
  return OperatorModel.findById(operatorId).select('-password')
}

export const updateMe = async (
  operatorId: string,
  payload: {
    callsign?: string
    qth?: string
    locator?: string
    email?: string
    password?: string
    currentPassword?: string
  }
) => {
  if (payload.password) {
    if (!payload.currentPassword) {
      throw new Error('Current password is required to set a new password')
    }

    const operator = await OperatorModel.findById(operatorId)
    if (!operator) {
      throw new Error('Operator not found')
    }

    const isMatch = await comparePassword(
      payload.currentPassword,
      operator.password
    )

    if (!isMatch) {
      throw new Error('Current password is incorrect')
    }

    payload.password = await hashPassword(payload.password)
    delete payload.currentPassword
  }
  return OperatorModel.findByIdAndUpdate(
    operatorId,
    payload,
    { new: true }
  ).select('-password')
}

export const deleteMe = async (operatorId: string) => {
  // Optional but recommended: delete all QSOs first
  await QSOModel.deleteMany({ operatorId })

  return OperatorModel.findByIdAndDelete(operatorId)
}