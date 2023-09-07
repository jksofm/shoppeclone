import { ResponseApi, responseLogin, responseRegister } from 'src/models/auth/response.types'
import { updateBody, userInfo } from 'src/models/auth/user.types'
import http from 'src/utils/http'

export const registerAccount = (body: { email: string; password: string }) =>
  http.post<responseRegister>('/register', body, {
    // headers: {
    //   'expire-access-token': 1,
    //   'expire-refresh-token': 30 * 60 * 1000000
    // }
  })

export const loginAccount = (body: { email: string; password: string }) =>
  http.post<responseLogin>('/login', body, {
    // headers: {
    //   'expire-access-token': 1,
    //   'expire-refresh-token': 30 * 60 * 1000000
    // }
  })

export const logoutAccount = () => http.post('/logout')

export const getProfile = () => http.get<ResponseApi<Partial<userInfo>>>('/me')

export const updateProfile = (body: updateBody) => http.put('/user', body)

export const uploadAvatar = (body: FormData) =>
  http.post<ResponseApi<string>>('/user/upload-avatar', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const refreshAccessToken = (body: { refresh_token: string }) => http.post('/refresh-access-token', body)
