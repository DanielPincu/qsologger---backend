import Joi from 'joi'

export const createQSO = Joi.object({
  callsign: Joi.string().trim().uppercase().required(),
  band: Joi.string().trim().required(),
  mode: Joi.string().trim().required(),

  rstSent: Joi.string().trim().optional(),
  rstReceived: Joi.string().trim().optional(),

  qsoDate: Joi.date().required(),

  qth: Joi.string().trim().optional(),

  locator: Joi.string()
    .trim()
    .uppercase()
    .pattern(/^[A-R]{2}\d{2}[A-X]{0,2}$/)
    .optional(),
})

export const updateQSO = Joi.object({
  callsign: Joi.string().trim().uppercase().optional(),
  band: Joi.string().trim().optional(),
  mode: Joi.string().trim().optional(),

  rstSent: Joi.string().trim().optional(),
  rstReceived: Joi.string().trim().optional(),

  qsoDate: Joi.date().optional(),

  qth: Joi.string().trim().optional(),

  locator: Joi.string()
    .trim()
    .uppercase()
    .pattern(/^[A-R]{2}\d{2}[A-X]{0,2}$/)
    .optional(),
})