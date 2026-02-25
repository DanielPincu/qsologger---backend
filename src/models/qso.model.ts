import { Schema, model, Types } from 'mongoose'

interface IQSODocument {
  callsign: string
  band: string
  mode: string
  rstSent?: string
  rstReceived?: string
  qsoDate: Date
  operatorId: Types.ObjectId
  qth?: string
  locator?: string
}

const QSOSchema = new Schema<IQSODocument>(
  {
    callsign: { type: String, required: true, uppercase: true, trim: true },
    band: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true },

    rstSent: { type: String },
    rstReceived: { type: String },

    qsoDate: { type: Date, required: true },
    operatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    qth: { type: String },
    locator: { type: String },
  },
  { timestamps: true }
)

export const QSOModel = model<IQSODocument>('QSO', QSOSchema)