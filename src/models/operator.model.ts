import { Schema, model } from 'mongoose'
import { IOperator } from '../interfaces/operator.interface'

const operatorSchema = new Schema<IOperator>(
  {
    callsign: { type: String, required: true, unique: true, sparse: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    qth: { type: String },
    locator: { type: String }
  },
  { timestamps: true }
)

export const OperatorModel = model<IOperator>('Operator', operatorSchema)