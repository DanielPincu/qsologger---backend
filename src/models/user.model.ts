import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    callsign: { type: String, required: true, unique: true, sparse: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    qth: { type: String },
    locator: { type: String }
  },
  { timestamps: true }
)

export const UserModel = model('User', userSchema)