/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import FormAuth from 'src/components/FormAuth'
import { FormAuthPayload } from 'src/models/form/form'
import bg from '../../assets/images/background-register-page.png'
import { registerAccount } from 'src/apis/auth.api'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { errorResponseEntity } from 'src/models/auth/response.types'
import { isAxiosUnprocessableEntityError, saveUserInfo } from 'src/utils/common'
import { useAppContext } from 'src/contexts/app.context'
import { useNavigate } from 'react-router-dom'
import pathRoute from 'src/constants/path'
import { userInfo } from 'src/models/auth/user.types'

export interface RegisterPageProps {}

export default function RegisterPage(props: RegisterPageProps) {
  const [formError, setErrorForm] = React.useState<{ email: string; password: string }>({ email: '', password: '' })
  const { setIsAuthenticated, setUser } = useAppContext()
  const navigate = useNavigate()
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormAuthPayload, 'confirm_password'>) => registerAccount(body)
  })
  const handleSubmitForm = async (values: FormAuthPayload) => {
    const body = omit(values, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        // const access_token = data.data.data?.access_token
        // localStorage.setItem('access_token', access_token as string)
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
        saveUserInfo({ ...data.data.data?.user, date_of_birth: '', address: '', phone: '', name: '' } as userInfo)
        setUser((prev) => {
          return {
            ...prev,
            ...data.data.data?.user
          }
        })
        navigate(pathRoute.home)
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

  return (
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
            <FormAuth isLoading={registerAccountMutation.isLoading} formError={formError} onSubmit={handleSubmitForm} />
          </div>
        </div>
      </div>
    </div>
  )
}
