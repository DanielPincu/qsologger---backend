import { Request, Response } from 'express'
import { getErrorMessage } from '../../utils/error.util'
type AuthRequest = Request & { operatorId: string }
import * as OperatorService from './operator.service'

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const operator = await OperatorService.getMe(req.operatorId)

    if (!operator) {
      return res.status(404).json({ message: 'Operator not found' })
    }

    res.json(operator)
  } catch (error) {
    return res.status(500).json({ message: getErrorMessage(error) })
  }
}

export const updateMe = async (req: AuthRequest, res: Response) => {
  try {
    const operator = await OperatorService.updateMe(
      req.operatorId,
      req.body
    )

    if (!operator) {
      return res.status(404).json({ message: 'Operator not found' })
    }

    if (req.body.password) {
      return res.json({ message: 'Password successfully updated' })
    }

    res.json(operator)
  } catch (error) {
    return res.status(400).json({ message: getErrorMessage(error) })
  }
}

export const deleteMe = async (req: AuthRequest, res: Response) => {
  try {
    const operator = await OperatorService.deleteMe(req.operatorId)

    if (!operator) {
      return res.status(404).json({ message: 'Operator not found' })
    }

    res.status(200).json({ message: 'Operator deleted' })
  } catch (error) {
    return res.status(500).json({ message: getErrorMessage(error) })
  }
}