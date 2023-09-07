import axios, { type AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { HttpStatusCode } from 'src/constants/httpStatusCode'
import { errorResponseOther, responseLogin } from 'src/models/auth/response.types'
import {
  getAccessToken,
  refreshToken,
  removeAccessToken,
  removeRefreshToken,
  removeUserInfo,
  saveAccessToken,
  saveRefreshToken
} from './common'
import pathRoute from 'src/constants/path'

class Http {
  instance: AxiosInstance
  private accessToken: string | null
  refreshTokenRequest: null | Promise<string>
  constructor() {
    this.accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : ''
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'expire-access-token': 60 * 60 * 24,
        'expire-refresh-token': 60 * 60 * 24 * 160 //160 ngay
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = getAccessToken()
          return config
        }
        return config
      },
      (error) => {
        this.accessToken = ''
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        // console.log(this.accessToken)
        // console.log(response)
        const { url } = response.config

        if (url === pathRoute.login || url === pathRoute.register) {
          this.accessToken = (response.data as responseLogin).data?.access_token as string

          saveRefreshToken((response.data as responseLogin).data?.refresh_token as string)
          saveAccessToken(this.accessToken)
        }
        if (url === pathRoute.logout) {
          removeAccessToken()
          removeUserInfo()
          removeRefreshToken()

          this.accessToken = ''
        }
        return response
      },
      (error: AxiosError<errorResponseOther>) => {
        const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
        if (
          error.response?.status === HttpStatusCode.Unauthorized &&
          error.response.data.data?.name === 'EXPIRED_TOKEN' &&
          config.url !== 'refresh-access-token'
        ) {
          this.refreshTokenRequest = this.refreshTokenRequest
            ? this.refreshTokenRequest
            : refreshToken().finally(() => {
                this.refreshTokenRequest = null
              })
          return this.refreshTokenRequest
            .then((access_token) => {
              config.headers.authorization = access_token
              this.instance(config)
            })
            .catch((refreshTokenerror: AxiosError<errorResponseOther>) => {
              removeAccessToken()
              removeUserInfo()
              removeRefreshToken()
              this.accessToken = ''
              toast.error(refreshTokenerror.response?.data.message)

              throw refreshTokenerror
            })
        }
        if (
          error.response?.status !== HttpStatusCode.UnprocessableEntity &&
          error.response?.status !== HttpStatusCode.Unauthorized
        ) {
          // console.log('testssss')
          const message = error.response?.data?.message || error.message
          toast.error(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })
        }
        removeAccessToken()
        removeUserInfo()
        removeRefreshToken()

        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
