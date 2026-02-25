import { Band } from '../types/qsoBand.type'
import { Mode } from '../types/qsoMode.type'

export interface IQSO {
  _id: string
  remoteCallsign: string
  band: Band
  mode: Mode
  rstSent: string
  rstReceived: string
  qsoDate: Date
  operatorId: string
  
  qth?: string
  locator?: string
}

export type CreateQSO = Omit<IQSO, '_id' | 'operatorId'>
export type UpdateQSO = Partial<CreateQSO>