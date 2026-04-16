import Joi from 'joi'

export const updateOperator = Joi.object({
  callsign: Joi.string().trim().uppercase().optional(),
  locator: Joi.string()
    .trim()
    .uppercase()
    .pattern(/^[A-R]{2}\d{2}[A-X]{0,2}$/)
    .optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  currentPassword: Joi.string().when('password', {
    is: Joi.exist(),
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
})