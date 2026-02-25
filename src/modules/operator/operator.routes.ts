import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth.middleware'
import { validate } from '../../validators/joi.validator'
import * as OperatorController from './operator.controller'
import { updateOperator } from './operator.validation'

const router = Router()

router.get(
  '/me',
  requireAuth,
  OperatorController.getMe
)

router.put(
  '/me',
  requireAuth,
  validate(updateOperator),
  OperatorController.updateMe
)

router.delete(
  '/me',
  requireAuth,
  OperatorController.deleteMe
)

export default router