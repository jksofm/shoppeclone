import { userInfo } from './user.types'

export interface ResponseApi<Data> {
  message: string
  data?: Data
}

export interface dataResponseRegister {
  access_token: string
  expires: string
  refresh_token: string
  expires_refresh_token: number

  user: Omit<userInfo, 'date_of_birth' | 'address' | 'phone' | 'name'>
}
export interface dataResponseLogin {
  access_token: string
  expires: number
  expires_refresh_token: number
  user: userInfo
  refresh_token: string
}
export interface responseRegister extends ResponseApi<dataResponseRegister> {}

export interface responseLogin extends ResponseApi<dataResponseLogin> {}
export type errorResponseEntity = {
  message: string
  data: {
    email?: string
    password?: string
  }
}
export type errorResponseOther = {
  message: string
  data?: {
    message: string
    name: string
  }
}
