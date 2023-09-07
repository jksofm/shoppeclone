import { beforeAll, describe, expect, test } from 'vitest'

import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as matchers from '@testing-library/jest-dom/matchers'
import { MemoryRouter } from 'react-router-dom'
import App from 'src/App'
import pathRoute from 'src/constants/path'

expect.extend(matchers)

describe('Login', () => {
  // const user = userEvent.setup()
  const user = userEvent.setup()

  beforeAll(async () => {
    render(
      <MemoryRouter initialEntries={[pathRoute.login]}>
        <App />
      </MemoryRouter>
    )
  })
  test('Hiển thị lỗi khi không nhập gì', async () => {
    //Check render

    await waitFor(() => {
      expect(screen.getByText(/Bạn chưa có tài khoản/i)).toBeTruthy()
    })
    //Click vào submit button

    const submitBtn = document.querySelector('button[type="submit"]') as Element

    user.click(submitBtn)
    await waitFor(async () => {
      expect(screen.queryByText('Please enter email')).toBeTruthy()
      expect(screen.queryByText('password is a required field')).toBeTruthy()
    })
    // screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })

  test('Hiển thị lỗi khi không sai giá trị', async () => {
    //Check render

    const submitBtn = document.querySelector('button[type="submit"]') as Element

    const emailInput = document.querySelector('input[placeholder="Email"]') as HTMLInputElement
    const passwordInput = document.querySelector('input[placeholder="Password"]') as HTMLInputElement
    fireEvent.change(emailInput, {
      target: {
        value: 'mail'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123'
      }
    })

    fireEvent.click(submitBtn)

    await waitFor(
      async () => {
        expect(screen.queryByText('Email is in valid')).toBeTruthy()
        expect(screen.queryByText('Password is required to have at lease 6 characters')).toBeTruthy()
      },
      {
        timeout: 2000
      }
    )

    // screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })

  test('Không nên hiển thị lỗi khi nhập value đúng', async () => {
    const submitBtn = document.querySelector('button[type="submit"]') as Element

    const emailInput = document.querySelector('input[placeholder="Email"]') as HTMLInputElement
    const passwordInput = document.querySelector('input[placeholder="Password"]') as HTMLInputElement
    fireEvent.change(emailInput, {
      target: {
        value: 'lequochuypy1998@gmail.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123456'
      }
    })
    fireEvent.click(submitBtn)

    await waitFor(
      () => {
        expect(screen.queryByText('Email is in valid')).toBe(null)
        expect(screen.queryByText('Password is required to have at lease 6 characters')).toBeNull()
      },
      {
        timeout: 2000
      }
    )
    // fireEvent.submit(submitBtn)
    // await waitFor(() => {
    //   screen.debug(document.body.parentElement as HTMLElement, 99999999)
    // })
    screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })
})
