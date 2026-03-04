import { Response, Request } from 'express'
import * as QSOService from './qso.service'
import { CreateQSO, UpdateQSO } from '../../interfaces/qso.interface'
import { getErrorMessage } from '../../utils/error.util'

type AuthRequest = Request & { operatorId: string }

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const payload = req.body as CreateQSO

    const qso = await QSOService.createQSO(
      req.operatorId,
      payload
    )

    res.status(201).json(qso)
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) })
  }
}

export const list = async (req: AuthRequest, res: Response) => {
  try {
    const qsos = await QSOService.getQSOs(req.operatorId)
    res.json(qsos)
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) })
  }
}

export const getOne = async (req: AuthRequest, res: Response) => {
  const { id } = req.params as { id: string }

  const qso = await QSOService.getQSOById(
    req.operatorId,
    id
  )

  if (!qso) {
    return res.status(404).json({ message: 'QSO not found' })
  }

  res.json(qso)
}

export const update = async (req: AuthRequest, res: Response) => {
  const { id } = req.params as { id: string }

  try {
    const qso = await QSOService.updateQSO(
      req.operatorId,
      id,
      req.body as UpdateQSO
    )

    if (!qso) {
      return res.status(404).json({ message: 'QSO not found' })
    }

    res.json(qso)
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) })
  }
}

export const remove = async (req: AuthRequest, res: Response) => {
  const { id } = req.params as { id: string }

  try {
    const qso = await QSOService.deleteQSO(
      req.operatorId,
      id
    )

    if (!qso) {
      return res.status(404).json({ message: 'QSO not found' })
    }

    res.status(200).json({ message: 'QSO deleted' })
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) })
  }
}