/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'
import { HttpStatusCode } from 'src/constants/httpStatusCode'
import { userInfo } from 'src/models/auth/user.types'

import { refreshAccessToken } from 'src/apis/auth.api'

export const LocalStorageEventTarget = new EventTarget()

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const saveAccessToken = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const removeAccessToken = () => {
  localStorage.removeItem('access_token')
  // const clearSEvent = new Event('clearLS')
  // LocalStorageEventTarget.dispatchEvent(clearSEvent)
}

export const getAccessToken = () => {
  return localStorage.getItem('access_token') ? localStorage.getItem('access_token') : ''
}

export const saveUserInfo = (user_info: userInfo) => {
  localStorage.setItem('user_info', JSON.stringify(user_info))
}
export const saveRefreshToken = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}
export const removeRefreshToken = () => {
  localStorage.removeItem('refresh_token')
  const clearSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearSEvent)
}

export const getUserInfo = () => {
  return localStorage.getItem('user_info')
    ? JSON.parse(localStorage.getItem('user_info') as string)
    : {
        _id: '',
        address: '',
        createdAt: '',
        date_of_birth: '',
        email: '',
        name: '',
        phone: '',
        roles: [],
        updatedAt: ''
      }
}
export const removeUserInfo = () => {
  localStorage.removeItem('user_info')
}
export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i,${id}`
}
export const getIdFromURL = (nameId: string) => {
  const arr = nameId.split('-i,')
  return arr[arr.length - 1]
}
export const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token') as string
  try {
    const res = await refreshAccessToken({ refresh_token })
    console.log(res)
    const { access_token } = res.data.data
    localStorage.setItem('access_token', access_token)
    return access_token
  } catch (error: any) {
    throw error.response
  }
}
