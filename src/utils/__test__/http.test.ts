import { describe, it, expect } from 'vitest'
import http from '../http'
import { HttpStatusCode } from 'src/constants/httpStatusCode'
import { saveRefreshToken } from '../common'

describe('http axios', () => {
  it('Gọi API', async () => {
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Auth Request', async () => {
    await http.post('/login', {
      email: 'lequochuypy1998@gmail.com',
      password: '123456'
    })

    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Refresh Token', async () => {
    // const access_token_1s =
    //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTQ1YjUwM2JlNTc2ZGQ1M2QyYjUwYiIsImVtYWlsIjoibGVxdW9jaHV5cHkxOTk4QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDktMDRUMDk6NDg6MTYuMDUyWiIsImlhdCI6MTY5MzgyMDg5NiwiZXhwIjoxNjkzODIwODk3fQ.OqTnee5o9WHIssnf1ivDhoOi7V9nmb0rE9jUCQpEmxw'
    // saveAccessToken(access_token_1s)
    const refresh_token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTQ1YjUwM2JlNTc2ZGQ1M2QyYjUwYiIsImVtYWlsIjoibGVxdW9jaHV5cHkxOTk4QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDktMDRUMTA6MDM6MzQuNDQxWiIsImlhdCI6MTY5MzgyMTgxNCwiZXhwIjoxNzA3NjQ1ODE0fQ.2Uw6VsqY8Pt3d-WxKX5HofqTaNS5lqGrMzUEkWn14Qc'

    // const result = await http.post('/refresh-access-token', {
    //   refresh_token
    // })

    // const newAccessToken = result.data.data.access_token

    // saveAccessToken(newAccessToken)
    saveRefreshToken(refresh_token)
    const res = await http.get('/me')

    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
