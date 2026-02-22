import { Schema, model } from 'mongoose'

const QSOSchema = new Schema(
  {
    callsign: { type: String, required: true },
    band: { type: String, required: true },
    mode: { type: String, required: true },

    rstSent: { type: String },
    rstReceived: { type: String },

    qsoDate: { type: Date, required: true },
    operatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    qth: { type: String },
    locator: { type: String },
  },
  { timestamps: true }
)

export const QSOModel = model('QSO', QSOSchema)