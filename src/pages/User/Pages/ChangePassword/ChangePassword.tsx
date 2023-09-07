import React, { useState } from 'react'
import { InputField } from 'src/components/FormAuth/InputField'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yub from 'yup'
import PopupConfirm from 'src/components/PopupConfirm'
import { useMutation } from '@tanstack/react-query'
import { updateProfile } from 'src/apis/auth.api'
import { toast } from 'react-toastify'
import { useAppContext } from 'src/contexts/app.context'

export default function ChangePassword() {
  const [popupConfirm, setPopupConfirm] = useState<boolean>(false)
  const { handleTextLanguage } = useAppContext()
  interface formDataPassword {
    password: string
    confirm_password: string
    new_password: string
  }
  const schema = yub.object().shape({
    password: yub.string().required().max(20, 'Độ dài tối đa là 20 ký tự').min(6, 'Độ dài tối thiểu là 6 ký tự'),
    confirm_password: yub
      .string()
      .required()
      .test({
        name: 'confirm_passowrd',
        skipAbsent: true,
        test(value, ctx) {
          if (value !== this.parent.new_password) {
            return ctx.createError({ message: 'Mật khẩu không giống nhau! Vui lòng kiểm tra lại!' })
          }
          return true
        }
      })
      .max(20, 'Độ dài tối đa là 20 ký tự')
      .min(6, 'Độ dài tối thiểu là 6 ký tự'),
    new_password: yub.string().required().max(20, 'Độ dài tối đa là 20 ký tự').min(6, 'Độ dài tối thiểu là 6 ký tự')
  })
  const updatePasswordMutation = useMutation({
    mutationFn: (body: Omit<formDataPassword, 'confirm_password'>) => updateProfile(body)
  })
  const {
    control,
    handleSubmit,
    // formState: { errors },
    setValue
    // setError
  } = useForm<formDataPassword>({
    defaultValues: {
      password: '',
      confirm_password: '',
      new_password: ''
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema as any)
  })
  const onSubmit = (values: formDataPassword) => {
    // console.log(values)
    updatePasswordMutation.mutate(
      { new_password: values.new_password, password: values.password },
      {
        onSuccess: () => {
          setPopupConfirm(false)
          toast.success('Cập nhật mật khẩu thành công!')
          setValue('confirm_password', '')
          setValue('new_password', ''), setValue('password', '')
        },
        onError: (errors) => {
          // console.log(errors)
        }
      }
    )
  }
  const triggerSubmit = () => {
    handleSubmit(onSubmit)()
  }
  return (
    <>
      <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
        <div className='border-b border-b-gray-200 py-6'>
          <h1 className='text-lg font-medium capitalize text-gray-900'>{handleTextLanguage('ChangePassword')}</h1>
          <div className='mt-1 text-sm text-gray-700'>{handleTextLanguage('Security')}</div>
        </div>
        <form className='mt-8 mr-auto max-[90%]'>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right lg:text-left'>
                {handleTextLanguage('OldPassword')}
              </div>
              <div className='sm:w-[80%] sm:pl-5'>
                <InputField
                  className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  name='password'
                  type='password'
                  control={control}
                  placeholder={handleTextLanguage('OldPassword')}
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right lg:text-left'>
                {handleTextLanguage('NewPassword')}
              </div>
              <div className='sm:w-[80%] sm:pl-5'>
                <InputField
                  className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  name='new_password'
                  type='password'
                  placeholder={handleTextLanguage('NewPassword')}
                  control={control}
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right lg:text-left'>
                {handleTextLanguage('ConfirmPassword')}
              </div>
              <div className='sm:w-[80%] sm:pl-5'>
                <InputField
                  className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  control={control}
                  name='confirm_password'
                  type='password'
                  placeholder={handleTextLanguage('ConfirmPassword')}
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
              <div className='sm:w-[80%] sm:pl-5'>
                <button
                  className='flex h-9 px-4 items-center rounded-sm bg-primary-color px-5 text-center text-sm text-white hover:bg-primary-color/80'
                  type='button'
                  onClick={() => setPopupConfirm(true)}
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {popupConfirm && (
        <PopupConfirm
          message={handleTextLanguage('MessageConfirmChangePassword')}
          setShowPopUp={setPopupConfirm}
          title={handleTextLanguage('Confirm')}
          handlePopup={triggerSubmit}
        />
      )}
    </>
  )
}
