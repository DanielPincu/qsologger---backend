import { QSOModel } from '../../models/qso.model'
import { CreateQSO, UpdateQSO } from '../../interfaces/qso.interface'

export const createQSO = async (
  operatorId: string,
  payload: CreateQSO
) => {
  return QSOModel.create({
    ...payload,
    operatorId,
  })
}

export const getQSOs = async (operatorId: string) => {
  return QSOModel.find({ operatorId }).sort({ qsoDate: -1 })
}

export const getQSOById = async (
  operatorId: string,
  qsoId: string
) => {
  return QSOModel.findOne({ _id: qsoId, operatorId })
}

export const updateQSO = async (
  operatorId: string,
  qsoId: string,
  payload: UpdateQSO
) => {
  return QSOModel.findOneAndUpdate(
    { _id: qsoId, operatorId },
    payload,
    { new: true }
  )
}

export const deleteQSO = async (
  operatorId: string,
  qsoId: string
) => {
  return QSOModel.findOneAndDelete({ _id: qsoId, operatorId })
}