import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth.middleware'
import { validate } from '../../validators/joi.validator'
import * as QSOController from './qso.controller'
import { createQSO, updateQSO } from './qso.validation'

const router = Router()

router.post(
  '/',
  requireAuth,
  validate(createQSO),
  QSOController.create
)

router.get(
  '/',
  requireAuth,
  QSOController.list
)

router.get(
  '/:id',
  requireAuth,
  QSOController.getOne
)

router.put(
  '/:id',
  requireAuth,
  validate(updateQSO),
  QSOController.update
)

router.delete(
  '/:id',
  requireAuth,
  QSOController.remove
)

export default router