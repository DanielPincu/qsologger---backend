import { QSOModel } from '../../models/qso.model'
import { OperatorModel } from '../../models/operator.model'
import { CreateQSO, UpdateQSO, IQSO } from '../../interfaces/qso.interface'

export const createQSO = async (
  operatorId: string,
  payload: CreateQSO
): Promise<IQSO | null> => {
  const created = await QSOModel.create({
    ...payload,
    operatorId,
    confirmed: false
  })

  // Get current operator callsign
  const operator = await OperatorModel.findById(operatorId)
  if (!operator) return created

  const myCallsign = operator.callsign
  const otherCallsign = payload.remoteCallsign

  const date = new Date(payload.qsoDate)
  const start = new Date(date.getTime() - 24 * 60 * 60 * 1000)
  const end = new Date(date.getTime() + 24 * 60 * 60 * 1000)

  // Find potential reversed match
  const candidate = await QSOModel.findOne({
    remoteCallsign: myCallsign,
    band: payload.band,
    qsoDate: { $gte: start, $lte: end },
    confirmed: false,
    operatorId: { $ne: operatorId }
  })

  if (!candidate) return created

  const candidateOperator = await OperatorModel.findById(candidate.operatorId)
  if (!candidateOperator) return created

  // Check reversed callsigns
  if (candidateOperator.callsign !== otherCallsign) {
    return created
  }

  const confirmedAt = new Date()

  await QSOModel.findByIdAndUpdate(created._id, {
    confirmed: true,
    confirmedAt,
    matchedQsoId: candidate._id
  })

  await QSOModel.findByIdAndUpdate(candidate._id, {
    confirmed: true,
    confirmedAt,
    matchedQsoId: created._id
  })

  return QSOModel.findById(created._id)
}

export const getQSOs = async (operatorId: string): Promise<IQSO[]> => {
  return QSOModel.find({ operatorId }).sort({ qsoDate: -1 })
}

export const getQSOById = async (
  operatorId: string,
  qsoId: string
): Promise<IQSO | null> => {
  return QSOModel.findOne({ _id: qsoId, operatorId })
}

export const updateQSO = async (
  operatorId: string,
  qsoId: string,
  payload: UpdateQSO
): Promise<IQSO | null> => {
  const qso = await QSOModel.findOne({ _id: qsoId, operatorId })
  if (!qso) return null

  if (qso.confirmed) {
    throw new Error('Confirmed QSOs cannot be updated')
  }

  return QSOModel.findByIdAndUpdate(
    qsoId,
    payload,
    { returnDocument: 'after' }
  )
}

export const deleteQSO = async (
  operatorId: string,
  qsoId: string
): Promise<IQSO | null> => {
  const qso = await QSOModel.findOne({ _id: qsoId, operatorId })
  if (!qso) return null

  if (qso.confirmed) {
    throw new Error('Confirmed QSOs cannot be deleted')
  }

  return QSOModel.findByIdAndDelete(qsoId)
}