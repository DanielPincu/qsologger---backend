import { Schema, model } from 'mongoose'

const QSOSchema = new Schema(
  {
    remoteCallsign: { type: String, required: true, uppercase: true, trim: true },
    band: {
      type: String,
      required: true,
      trim: true,
      enum: ['160m', '80m', '40m', '20m', '15m', '10m', '6m', '2m', '70cm'],
    },
    mode: {
      type: String,
      required: true,
      trim: true,
      enum: ['SSB', 'CW', 'RTTY', 'AM', 'FM'],
    },

    rstSent: { type: String, required: true },
    rstReceived: { type: String, required: true },

    qsoDate: { type: Date, required: true },
    operatorId: { type: Schema.Types.ObjectId, ref: 'Operator', required: true },

    qth: { type: String },
    locator: { type: String },
  },
  { timestamps: true }
)

export const QSOModel = model('QSO', QSOSchema)