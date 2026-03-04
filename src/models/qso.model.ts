import { Schema, model } from "mongoose";
import { IQSO } from "../interfaces/qso.interface";

const QSOSchema = new Schema(
  {
    remoteCallsign: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    band: {
      type: String,
      required: true,
      trim: true,
      enum: ["160m", "80m", "40m", "20m", "15m", "10m", "6m", "2m", "70cm"],
    },
    mode: {
      type: String,
      required: true,
      trim: true,
      enum: ["SSB", "CW", "RTTY", "AM", "FM"],
    },

    rstSent: { type: String, required: true },
    rstReceived: { type: String, required: true },

    qsoDate: { type: Date, required: true },
    operatorId: {
      type: Schema.Types.ObjectId,
      ref: "Operator",
      required: true,
    },

    confirmed: { type: Boolean, default: false },
    confirmedAt: { type: Date },
    matchedQsoId: { type: Schema.Types.ObjectId, ref: "QSO" },

    qth: { type: String },
    locator: { type: String },

    from: {
      lat: { type: Number },
      lon: { type: Number },
    },
    to: {
      lat: { type: Number },
      lon: { type: Number },
    },
    distanceKm: { type: Number },
  },

  { timestamps: true },
);

export const QSOModel = model<IQSO>("QSO", QSOSchema);
