import { Request, Response } from 'express'
import * as OperatorService from './operator.service'

export const getMe = async (req: Request, res: Response) => {
  const operator = await OperatorService.getMe(req.operatorId)

  if (!operator) {
    return res.status(404).json({ message: 'Operator not found' })
  }

  res.json(operator)
}

export const updateMe = async (req: Request, res: Response) => {
  const operator = await OperatorService.updateMe(
    req.operatorId,
    req.body
  )

  if (!operator) {
    return res.status(404).json({ message: 'Operator not found' })
  }

  res.json(operator)
}

export const deleteMe = async (req: Request, res: Response) => {
  const operator = await OperatorService.deleteMe(req.operatorId)

  if (!operator) {
    return res.status(404).json({ message: 'Operator not found' })
  }

  res.status(200).json({ message: 'Operator deleted' })
}