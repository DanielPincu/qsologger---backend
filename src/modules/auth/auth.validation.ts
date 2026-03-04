import Joi from 'joi'

export const registerSchema = Joi.object({
  callsign: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  locator: Joi.string()
    .uppercase()
    .pattern(/^[A-Ra-r]{2}[0-9]{2}([A-Xa-x]{2})?$/)
    .required()
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})