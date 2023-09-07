/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import { InputField } from '../FormAuth/InputField'
import { useForm } from 'react-hook-form'
import { updateBody, userInfo } from 'src/models/auth/user.types'
import { useAppContext } from 'src/contexts/app.context'
import * as yub from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProfile, updateProfile, uploadAvatar } from 'src/apis/auth.api'
import { toast } from 'react-toastify'
import PopupConfirm from '../PopupConfirm'
import { getUserInfo, isAxiosUnprocessableEntityError, saveUserInfo } from 'src/utils/common'

import { AxiosError } from 'axios'
import InputFile from '../InputFile'

export default function FormProfile() {
  const queryClient = useQueryClient()
  const [file, setFile] = React.useState<File>()

  const fileRef = useRef<HTMLInputElement>(null)
  const [popupConfirm, setPopupConfirm] = useState<boolean>(false)
  const { userInfo, setUser } = useAppContext()
  const { data } = useQuery({
    queryKey: ['Profile', userInfo._id],
    queryFn: getProfile,
    onSuccess: (data) => {
      setUser(data?.data.data as userInfo)
      const userInfoLS = getUserInfo()
      const newUserInfo = { ...userInfoLS, ...data.data.data }
      saveUserInfo(newUserInfo)
    }
  })
  const updateAvatarMutation = useMutation({
    mutationFn: (body: FormData) => uploadAvatar(body)
  })

  const updateProfileMutation = useMutation({
    mutationFn: (body: updateBody) => updateProfile(body)
  })
  const schema = yub.object().shape({
    name: yub.string().max(160, 'Độ dài tối đa là 160 ký tự'),
    phone: yub.string().max(20, 'Độ dài tối đa là 20 ký tự'),
    address: yub.string().max(160, 'Độ dài tối đa là 160 ký tự'),
    date_of_birth: yub.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
    avatar: yub.string()
  })
  // console.log(data)
  type FormDataUser = Pick<userInfo, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
  type FormDataError = Partial<{
    name: string
    date_of_birth: string
    avatar: string
    address: string
    phone: string
  }>
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError
  } = useForm<FormDataUser>({
    defaultValues: {
      address: '',
      name: '',
      phone: '',
      avatar: '',
      date_of_birth: ''
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema as any)
  })
  useEffect(() => {
    setPopupConfirm(false)
  }, [errors])
  const handleError = (error: AxiosError<{ data: FormDataError }>) => {
    if (isAxiosUnprocessableEntityError<{ data: FormDataError }>(error)) {
      const formError = error.response?.data.data
      // console.log(formError)
      if (formError) {
        console.log(Object.keys(formError))
        Object.keys(formError).forEach((key) => {
          setError(key as keyof FormDataError, {
            message: formError[key as keyof FormDataError],
            type: 'Server'
          })
        })
      }
    }
  }
  const onSubmit = (values: FormDataUser) => {
    if (file) {
      const dataAvatar = new FormData()
      dataAvatar.append('image', file)

      updateAvatarMutation.mutate(dataAvatar, {
        onSuccess: (data) => {
          const newValues: updateBody = {
            ...values,
            date_of_birth: (values.date_of_birth as Date).toISOString(),
            avatar: `${data.data.data}`
          }
          setValue('avatar', `${data.data.data}`)
          console.log(newValues)
          updateProfileMutation.mutate(newValues, {
            onSuccess: () => {
              toast.success('Cập nhật thông tin thành công!')
              setPopupConfirm(false)
              queryClient.invalidateQueries(['Profile', userInfo._id])
            },
            onError: (errors) => {
              handleError(errors as AxiosError<{ data: FormDataError }>)
            }
          })
        },
        onError: (error) => {
          console.log(error)
          if (
            isAxiosUnprocessableEntityError<{
              data: {
                image: string
              }
            }>(error)
          ) {
            const formError = error.response?.data.data as { image: string }
            if (formError) {
              setError('avatar', {
                message: formError['image'],
                type: 'Server'
              })
            }
          }
        }
      })
    } else {
      const newValues: updateBody = {
        ...values,
        date_of_birth: (values.date_of_birth as Date).toISOString(),
        avatar: userInfo.avatar || ''
      }
      updateProfileMutation.mutate(newValues, {
        onSuccess: () => {
          toast.success('Cập nhật thông tin thành công!')
          setPopupConfirm(false)
          queryClient.invalidateQueries(['Profile', userInfo._id])
        },
        onError: (errors) => {
          handleError(errors as AxiosError<{ data: FormDataError }>)
        }
      })
    }
  }
  const triggerSubmit = () => {
    handleSubmit(onSubmit)()
  }

  useEffect(() => {
    if (data) {
      setValue('address', userInfo.address)

      setValue('avatar', userInfo.avatar)
      setValue('phone', userInfo.phone)
      setValue(
        'date_of_birth',
        userInfo.date_of_birth
          ? (userInfo.date_of_birth as string).substring(0, 10)
          : new Date(Date.now()).toISOString().substring(0, 10)
      )
      setValue('name', userInfo.name)
    }
  }, [userInfo])
  return (
    <>
      <form
        className='mt-8 flex flex-col-reverse md:flex-row md:items-start'

        // onSubmit={handleSubmit(onSubmit)}
      >
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{userInfo.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <InputField
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                control={control}
                name='name'
                placeholder='Nhập vào tên'
                type='text'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <InputField
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                control={control}
                name='phone'
                placeholder='Nhập vào số điện thoại'
                type='text'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <InputField
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                control={control}
                name='address'
                placeholder='Nhập vào địa chỉ'
                type='text'
              />
            </div>
          </div>
          {/* <Controller
          control={control}
          name='date_of_birth'
          render={({ field }) => (
            <DateSelect errorMessage={errors.date_of_birth?.message} value={field.value} onChange={field.onChange} />
          )}
        /> */}
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row items-start'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
            <div className='sm:w-[80%] sm:pl-5 flex items-center'>
              <div className=''>
                <InputField type='date' placeholder='' control={control} name='date_of_birth' />
              </div>
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <button
                className='flex h-9 bg-primary-color items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-primary-color/80'
                type='button'
                onClick={() => setPopupConfirm(true)}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
        {/* <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center justify-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src={
                  previewImage ||
                  `${baseURL}/images/${userInfo.avatar}` ||
                  'https://i.pinimg.com/236x/84/46/c4/8446c44c18ccb026249276017b296f8f.jpg'
                }
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>

            <div className='mt-3'>
              <Controller
                name='avatar'
                control={control}
                render={({ field }) => (
                  <input
                    className='p-2 w-[80%] hidden'
                    ref={fileRef}
                    type='file'
                    accept='.jpg,.jpeg,.png'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const fileAvatar = e.target.files?.[0]
                      if (fileAvatar) {
                        if (fileAvatar.size > 1048576) {
                          toast.error('Kích thước file ảnh phải bé hơn 1MB')
                        } else if (!fileAvatar.type.includes('image')) {
                          toast.error('File ảnh phải đúng định dạng')
                        } else {
                          setFile(fileAvatar)
                        }
                      }
                      field.onChange({ target: { value: '', name: field.name } })
                    }}
                  />
                )}
              />
              <button
                onClick={() => {
                  fileRef.current?.click()
                }}
                type='button'
                className='px-5 py-3 text-black border text-sm border-slate-200 block mx-auto'
              >
                Chọn Ảnh
              </button>
            </div>

            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div> */}
        <InputFile control={control} file={file} fileRef={fileRef} setFile={setFile} />
      </form>
      {popupConfirm && (
        <PopupConfirm
          setShowPopUp={setPopupConfirm}
          message='Bạn có chắc chắn muốn cập nhật thông tin không ?'
          title='Xác nhận'
          handlePopup={triggerSubmit}
        />
      )}
    </>
  )
}
