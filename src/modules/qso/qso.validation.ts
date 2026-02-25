import Joi from 'joi'

export const createQSO = Joi.object({
  remoteCallsign: Joi.string().trim().uppercase().required(),
  band: Joi.string()
    .valid('160m', '80m', '40m', '20m', '15m', '10m', '6m', '2m', '70cm')
    .required(),
  mode: Joi.string()
    .valid('SSB', 'CW', 'FT8', 'RTTY', 'AM')
    .required(),

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
  remoteCallsign: Joi.string().trim().uppercase().optional(),
  band: Joi.string()
    .valid('160m', '80m', '40m', '20m', '15m', '10m', '6m', '2m', '70cm')
    .optional(),
  mode: Joi.string()
    .valid('SSB', 'CW', 'RTTY', 'AM', 'FM')
    .optional(),

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