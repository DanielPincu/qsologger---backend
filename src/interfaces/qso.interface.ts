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

  confirmed: boolean
  confirmedAt?: Date
  matchedQsoId?: string

  from?: {
    lat: number
    lon: number
  }

  to?: {
    lat: number
    lon: number
  }

  distanceKm?: number
}

export type CreateQSO = Omit<IQSO, '_id' | 'operatorId'>
export type UpdateQSO = Partial<CreateQSO>