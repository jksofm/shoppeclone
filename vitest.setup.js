import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { HttpStatusCode } from 'axios'

const loginResponse = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTQ1YjUwM2JlNTc2ZGQ1M2QyYjUwYiIsImVtYWlsIjoibGVxdW9jaHV5cHkxOTk4QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDktMDdUMDM6Mjk6MzcuNDg5WiIsImlhdCI6MTY5NDA1NzM3NywiZXhwIjoxNjk0MTQzNzc3fQ.MUSed02wqeGtUza-wjnEgNdGRcGSi05YnUn4pi9E-Ow',
    expires: 86400,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTQ1YjUwM2JlNTc2ZGQ1M2QyYjUwYiIsImVtYWlsIjoibGVxdW9jaHV5cHkxOTk4QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDktMDdUMDM6Mjk6MzcuNDg5WiIsImlhdCI6MTY5NDA1NzM3NywiZXhwIjoxNzA3ODgxMzc3fQ.-aswZln56jDAuDygNaKaJ_-uLJoL1yB6lPz_uy3vBQU',
    expires_refresh_token: 13824000,
    user: {
      _id: '64e45b503be576dd53d2b50b',
      roles: ['User'],
      email: 'lequochuypy1998@gmail.com',
      createdAt: '2023-08-22T06:53:04.834Z',
      updatedAt: '2023-09-01T03:06:45.003Z',
      __v: 0,
      address: '15 Hoàng QUóc Việt',
      date_of_birth: '2023-07-09T17:00:00.000Z',
      name: 'Quoc HUy',
      phone: '093540336444',
      avatar: 'b06aa0c2-3387-42b2-be38-817eaedd2f54.jpg'
    }
  }
}

export const restHandlers = [
  rest.get(`https://api-ecom.duthanhduoc.com/login`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginResponse))
  })
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
