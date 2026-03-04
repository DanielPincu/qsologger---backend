import { OperatorModel } from '../../models/operator.model'
import { QSOModel } from '../../models/qso.model'
import { hashPassword, comparePassword } from '../../utils/passwordHasher.util'
import { IOperator } from '../../interfaces/operator.interface'

type UpdateOperatorPayload = Partial<
  Pick<IOperator, 'callsign' | 'qth' | 'locator' | 'email' | 'password'>
> & {
  currentPassword?: string
}

export const getMe = async (
  operatorId: string
): Promise<Awaited<ReturnType<typeof OperatorModel.findById>>> => {
  return OperatorModel.findById(operatorId).select('-password')
}

export const updateMe = async (
  operatorId: string,
  payload: UpdateOperatorPayload
): Promise<Awaited<ReturnType<typeof OperatorModel.findById>>> => {
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
    { returnDocument: 'after' }
  ).select('-password')
}

export const deleteMe = async (
  operatorId: string
): Promise<Awaited<ReturnType<typeof OperatorModel.findByIdAndDelete>>> => {
  // Optional but recommended: delete all QSOs first
  await QSOModel.deleteMany({ operatorId })

  return OperatorModel.findByIdAndDelete(operatorId)
}