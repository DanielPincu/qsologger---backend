import Joi from 'joi'

export const updateOperator = Joi.object({
  callsign: Joi.string().trim().uppercase().optional(),
  qth: Joi.string().trim().optional(),
  locator: Joi.string()
    .trim()
    .uppercase()
    .pattern(/^[A-R]{2}\d{2}[A-X]{0,2}$/)
    .optional(),
  email: Joi.string().email().optional(),
})