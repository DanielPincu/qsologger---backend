export interface IOperator {
  _id: string
  callsign: string          
  email: string
  password: string                
  createdAt: Date
  updatedAt: Date

  qth?: string             
  locator?: string  
}