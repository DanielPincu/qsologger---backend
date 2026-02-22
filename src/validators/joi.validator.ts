import { Request, Response, NextFunction } from 'express'
import { Schema, ValidationErrorItem } from 'joi'

export const validate = (schema: Schema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false })

  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((d: ValidationErrorItem) => d.message),
    })
  }

  ;(req as any).body = value
  next()
}