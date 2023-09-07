// app.test.js
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, describe } from 'vitest'
import React from 'react'
import * as matchers from '@testing-library/jest-dom/matchers'
import App from './App'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import pathRoute from './constants/path'

expect.extend(matchers)

describe('App', () => {
  test('App render và chuyển trang', async () => {
    render(<App />, { wrapper: BrowserRouter })
    const user = userEvent.setup()
    //verify vao trang chu

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Home Page | Shoppee')
    })

    //verify chuyen trang login
    await user.click(screen.getByText('Đăng nhập'))
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Login Page | Shoppee')
    })
    // screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })

  test('Về trang not found', async () => {
    const badRoute = '/not-found'
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeTruthy()
    })
    screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })

  test('Render Register Page', async () => {
    render(
      <MemoryRouter initialEntries={[pathRoute.register]}>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản/i)).toBeTruthy()
    })
    screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })
})
