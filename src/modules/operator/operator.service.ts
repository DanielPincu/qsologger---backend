import { OperatorModel } from '../../models/operator.model'
import { QSOModel } from '../../models/qso.model'

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
  }
) => {
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