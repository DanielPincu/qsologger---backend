export interface ILoginPayload {
  email: string
  password: string
}

export interface IRegisterPayload {
  callsign: string
  email: string
  password: string
  
  qth?: string        
  locator?: string    
}