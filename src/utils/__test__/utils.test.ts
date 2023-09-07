/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  isAxiosError,
  isAxiosUnprocessableEntityError,
  removeRefreshToken,
  saveAccessToken,
  saveRefreshToken,
  saveUserInfo
} from '../common'
import { AxiosError } from 'axios'
import { HttpStatusCode } from 'src/constants/httpStatusCode'

describe('isAxiosError', () => {
  it('is AxiosError trả về boolean', () => {
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  it('is isAxiosUnprocessableEntityError trả về boolean', () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true)
  })
})

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTQ1YjUwM2JlNTc2ZGQ1M2QyYjUwYiIsImVtYWlsIjoibGVxdW9jaHV5cHkxOTk4QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDktMDRUMDg6MzY6NTkuNzE0WiIsImlhdCI6MTY5MzgxNjYxOSwiZXhwIjoxNjk0NDIxNDE5fQ.agj5lIrE5tEQcz-jgYsHvk_pR4BR-fmZdPtoS3ioyIo'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTQ1YjUwM2JlNTc2ZGQ1M2QyYjUwYiIsImVtYWlsIjoibGVxdW9jaHV5cHkxOTk4QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDktMDRUMDg6MzY6NTkuNzE0WiIsImlhdCI6MTY5MzgxNjYxOSwiZXhwIjoxNzAyNDU2NjE5fQ.Caa3jY6N-bF2cgOhcSvHAmZt0o5fYuzNcm-DMrftHlk'
const user_info =
  '{"_id":"64e45b503be576dd53d2b50b","roles":["User"],"email":"lequochuypy1998@gmail.com","createdAt":"2023-08-22T06:53:04.834Z","updatedAt":"2023-09-01T03:06:45.003Z","__v":0,"address":"15 Hoàng QUóc Việt","date_of_birth":"2023-07-09T17:00:00.000Z","name":"Quoc HUy","phone":"093540336444","avatar":"b06aa0c2-3387-42b2-be38-817eaedd2f54.jpg"}'

describe('saveAccessToken', () => {
  it('is access_token được set vào localStorage', () => {
    // để gọi được localstorage trong vitest thì ta phải chuyển môi trường bằng thư viên jsdom
    saveAccessToken(access_token)
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})
describe('RefreshToken', () => {
  beforeEach(() => {
    console.log('beforeEach')
  })
  it('is refresh_token được set vào localStorage', () => {
    // để gọi được localstorage trong vitest thì ta phải chuyển môi trường bằng thư viên jsdom
    saveRefreshToken(refresh_token)
    expect(localStorage.getItem('refresh_token')).toBe(refresh_token)
  })
  it('is refresh_token bị xóa khỏi localStorage', () => {
    saveRefreshToken(refresh_token)

    // để gọi được localstorage trong vitest thì ta phải chuyển môi trường bằng thư viên jsdom
    removeRefreshToken()
    expect(localStorage.getItem('refresh_token')).toBe(null)
  })
})
describe('saveUserInfo', () => {
  it('is UserInfo được set vào localStorage', () => {
    // để gọi được localstorage trong vitest thì ta phải chuyển môi trường bằng thư viên jsdom
    saveUserInfo(JSON.parse(user_info))
    expect(localStorage.getItem('user_info')).toBe(user_info)
  })
})
