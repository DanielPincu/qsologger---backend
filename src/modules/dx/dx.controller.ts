import { Request, Response } from 'express'
import * as DXService from './dx.service'

export const getDxRecord = async (req: any, res: Response) => {
  const data = await DXService.getDxRecord(req.operatorId)
  res.json(data)
}

export const getDxStats = async (req: any, res: Response) => {
  const data = await DXService.getDxStats(req.operatorId)
  res.json(data)
}

export const getDxByBand = async (req: any, res: Response) => {
  const data = await DXService.getDxByBand(req.operatorId)
  res.json(data)
}

export const getDxForBand = async (req: any, res: Response) => {
  const data = await DXService.getDxForBand(req.operatorId, req.params.band)
  res.json(data)
}

export const getWorkedGrids = async (req: any, res: Response) => {
  const data = await DXService.getWorkedGrids(req.operatorId)
  res.json(data)
}

export const getDXCC = async (req: any, res: Response) => {
  const data = await DXService.getDXCCStats(req.operatorId)
  res.json(data)
}