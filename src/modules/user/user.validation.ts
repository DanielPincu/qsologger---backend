import Joi from 'joi'

export const updateProfileSchema = Joi.object({
  callsign: Joi.string().max(20).optional(),
  qth: Joi.string().max(100).optional(),
  locator: Joi.string().max(10).optional()
})