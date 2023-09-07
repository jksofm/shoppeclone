/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import FormAuth from 'src/components/FormAuth'
import { FormAuthPayload } from 'src/models/form/form'
import bg from '../../assets/images/background-register-page.png'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from 'src/apis/auth.api'
import omit from 'lodash/omit'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError, saveUserInfo } from 'src/utils/common'
import { errorResponseEntity } from 'src/models/auth/response.types'
import { useAppContext } from 'src/contexts/app.context'
import { useNavigate } from 'react-router-dom'
import { userInfo } from 'src/models/auth/user.types'
import { Helmet } from 'react-helmet'

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const [formError, setErrorForm] = React.useState<{ email: string; password: string }>({ email: '', password: '' })
  const { isAuthenticated, setIsAuthenticated, setUser, handleTextLanguage } = useAppContext()
  const navigate = useNavigate()
  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormAuthPayload, 'confirm_password'>) => loginAccount(body)
  })
  const loginFunction = (body: { email: string; password: string }) => {
    loginAccountMutation.mutate(body, {
      onSuccess: (data) => {
        toast(data.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        setIsAuthenticated(true)
        saveUserInfo({ ...data.data.data?.user } as userInfo)
        setUser((prev) => {
          return {
            ...prev,
            ...data.data.data?.user
          }
        })
        navigate('/')
      },

      onError: (error: unknown) => {
        if (isAxiosUnprocessableEntityError<errorResponseEntity>(error)) {
          const formError = error.response?.data.data as Partial<{ email: string; password: string }>
          setErrorForm((prev: { email: string; password: string }) => {
            return { ...prev, ...formError }
          })
        }
      }
    })
  }
  const handleSubmitForm = (values: FormAuthPayload) => {
    const body = omit(values, ['confirm_password'])
    loginFunction(body)
  }
  return (
    <>
      <Helmet>
        <title className='title'>Login Page | Shoppee</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
        className='bg-primary-color'
      >
        <div className='container'>
          <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <FormAuth
                formError={formError}
                isLoading={loginAccountMutation.isLoading}
                isLoginPage
                onSubmit={handleSubmitForm}
                handleTestuser={() => {
                  loginFunction({ email: 'lequochuypy1998@gmail.com', password: '123456' })
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
