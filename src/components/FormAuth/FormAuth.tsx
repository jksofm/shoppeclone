import * as React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FormAuthPayload } from 'src/models/form/form'
import { InputField } from './InputField'
import * as yub from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import pathRoute from 'src/constants/path'
import { useAppContext } from 'src/contexts/app.context'
export interface FormAuthProps {
  isLoginPage?: boolean
  onSubmit: (payload: FormAuthPayload) => void
  formError: {
    email: string
    password: string
  }
  isLoading: boolean
  handleTestuser?: () => void
}

export default function FormAuth({ isLoginPage, onSubmit, formError, isLoading, handleTestuser }: FormAuthProps) {
  const { handleTextLanguage } = useAppContext()
  const schema = yub.object().shape({
    email: yub.string().required('Please enter email').email('Email is in valid'),
    password: yub.string().required().min(6, 'Password is required to have at lease 6 characters'),
    confirm_password: yub.string().test({
      name: 'is-confirm-pasword',
      test(value, ctx) {
        if (!isLoginPage) {
          if (value === '') {
            return ctx.createError({ message: 'Confirm Password is a required field' })
          }
          if (value !== this.parent.password) {
            return ctx.createError({ message: 'Pasword has to be the same with confirm password' })
          }
        }
        return true
      }
    })
  })

  // type Schema = yub.InferType<typeof schema>

  const { control, handleSubmit, setError } = useForm<FormAuthPayload>({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: ''
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema as any)
  })

  const handleSubmitForm = async (values: FormAuthPayload) => {
    await onSubmit(values)
  }
  React.useEffect(() => {
    if (formError.email !== '') {
      setError('email', {
        message: formError.email,
        type: 'server'
      })
    }
    if (formError.password !== '') {
      setError('password', {
        message: formError.password,
        type: 'server'
      })
    }
  }, [formError.email, formError.password, formError])
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} action='' className='p-10 rounded bg-white shadow-sm'>
      <div className='text-2xl'>{isLoginPage ? handleTextLanguage('Login') : handleTextLanguage('Register')}</div>
      <InputField control={control} name='email' type='email' placeholder='Email' className='mt-8' />

      <InputField control={control} name='password' type='password' placeholder='Password' />

      {!isLoginPage && (
        <InputField control={control} name='confirm_password' type='password' placeholder='Confirm password' />
      )}

      <div className='mt-3'>
        <button
          type='submit'
          className={
            !isLoading
              ? 'w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
              : 'w-full text-center py-4 px-2 uppercase bg-slate-300 text-black text-sm cursor-not-allowed'
          }
          disabled={isLoading}
        >
          {isLoading && (
            <svg
              aria-hidden='true'
              className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
          )}

          {isLoginPage && !isLoading && handleTextLanguage('Login')}
          {!isLoginPage && !isLoading && handleTextLanguage('Register')}
        </button>
        {isLoginPage && (
          <button
            type='button'
            onClick={() => {
              if (handleTestuser) {
                handleTestuser()
              }
            }}
            className={
              !isLoading
                ? 'w-full text-center mt-3 py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                : 'w-full text-center mt-3 py-4 px-2 uppercase bg-slate-300 text-black text-sm cursor-not-allowed'
            }
          >
            {isLoading && (
              <svg
                aria-hidden='true'
                className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
            )}
            {!isLoading && 'Test User'}
          </button>
        )}
      </div>

      {isLoginPage ? (
        <div className='mt-4 text-sm'>
          <span className='text-footer-text-color'> {handleTextLanguage('HaveAccountYet')}</span>
          <span className='ml-2 text-primary-color hover:text-orange-400'>
            <Link to={pathRoute.register}>{handleTextLanguage('Register')}</Link>
          </span>
        </div>
      ) : (
        <div className='mt-4 text-sm'>
          <span className='text-footer-text-color'> {handleTextLanguage('AlreadyHaveAccount')}</span>
          <span className='ml-2 text-primary-color hover:text-orange-400'>
            <Link to={pathRoute.login}>{handleTextLanguage('Login')}</Link>
          </span>
        </div>
      )}
    </form>
  )
}
