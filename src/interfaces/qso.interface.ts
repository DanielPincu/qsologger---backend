export interface IQSO {
  _id: string
  callsign: string
  band: string
  mode: string
  rstSent: string
  rstReceived: string
  qsoDate: Date
  operatorId: string
  
  qth?: string
  locator?: string
}

export type CreateQSO = Omit<IQSO, '_id' | 'operatorId'>
export type UpdateQSO = Partial<CreateQSO>