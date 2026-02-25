import { OperatorModel } from '../../models/operator.model'

export const getOperatorByEmail = async (email: string) => {
  return OperatorModel.findOne({ email })
}

export const createOperator = async (data: {
  callsign: string
  email: string
  password: string
}) => {
  return OperatorModel.create(data)
}