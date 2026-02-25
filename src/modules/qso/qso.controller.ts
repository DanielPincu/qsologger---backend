import { Response, Request } from 'express'
import * as QSOService from './qso.service'

export const create = async (req: Request, res: Response) => {
  const qso = await QSOService.createQSO(
    req.operatorId,
    req.body
  )

  res.status(201).json(qso)
}

export const list = async (req: Request, res: Response) => {
  const qsos = await QSOService.getQSOs(req.operatorId)
  res.json(qsos)
}

export const getOne = async (req: Request, res: Response) => {
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

export const update = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }

  const qso = await QSOService.updateQSO(
    req.operatorId,
    id,
    req.body
  )

  if (!qso) {
    return res.status(404).json({ message: 'QSO not found' })
  }

  res.json(qso)
}

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }

  const qso = await QSOService.deleteQSO(
    req.operatorId,
    id
  )

  if (!qso) {
    return res.status(404).json({ message: 'QSO not found' })
  }

  res.status(200).json({ message: 'QSO deleted' })
}