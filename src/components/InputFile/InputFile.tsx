/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
import { Controller, type Control } from 'react-hook-form'
import { toast } from 'react-toastify'
import { config } from 'src/constants/config'
import { useAppContext } from 'src/contexts/app.context'
import { userInfo } from 'src/models/auth/user.types'

interface InputFileProps {
  file: File | undefined
  fileRef: any
  control: Control<Pick<userInfo, 'address' | 'name' | 'avatar' | 'phone' | 'date_of_birth'>>
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
}
export default function InputFile({ file, fileRef, control, setFile }: InputFileProps) {
  const { userInfo } = useAppContext()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  return (
    <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
      <div className='flex flex-col items-center justify-center'>
        <div className='my-5 h-24 w-24'>
          <img
            src={
              previewImage ||
              `${config.baseURL}/images/${userInfo.avatar}` ||
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
    </div>
  )
}
