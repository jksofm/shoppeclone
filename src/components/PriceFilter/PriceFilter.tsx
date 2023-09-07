/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '../FormAuth/InputField'
import * as yub from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useQueryParams from 'src/hooks/useQueryParams'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from 'src/contexts/app.context'

export default function PriceFilter() {
  const queryParams = useQueryParams()
  const navigate = useNavigate()
  const { handleTextLanguage } = useAppContext()

  const schema = yub.object().shape({
    start: yub
      .number()
      .required('Price Required')
      .test({
        name: 'check-value',
        test(value, ctx) {
          if (value < 0 || value > this.parent.end) {
            return ctx.createError({ message: 'Invalid price' })
          }

          return true
        }
      }),
    end: yub
      .number()
      .required('Price Required')
      .test({
        name: 'check-value',
        test(value, ctx) {
          if (value < this.parent.start || value < 0) {
            return ctx.createError({ message: 'Invalid price' })
          }

          return true
        }
      })
  })
  const { control, handleSubmit } = useForm<{ start: number; end: number }>({
    defaultValues: {
      start: queryParams.price_min || 0,
      end: queryParams.price_max || 0
    },
    resolver: yupResolver(schema)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  })
  const handleValueSubmit = (values: { start: number; end: number }) => {
    // console.log(values)
    const newQueryParams = { ...queryParams, price_max: values.end, price_min: values.start, page: 1 }
    const result = new URLSearchParams(newQueryParams as any).toString()
    navigate(`?${result}`)
  }
  return (
    <div className='my-5'>
      <div>{handleTextLanguage('Price Range')}</div>
      <form onSubmit={handleSubmit(handleValueSubmit)} className=''>
        <div className='flex items-center md:flex-row flex-col'>
          <InputField control={control} name='start' type='number' placeholder='₫ TỪ' className='mt-2 py-2' />
          <div className='mx-2 h-[1px] w-[20px] bg-[#000]' />
          <InputField control={control} name='end' type='number' placeholder='₫ ĐẾN' className='mt-2 py-2' />
        </div>
        <div className='mt-2'>
          <button
            type='submit'
            className={'w-full text-center py-2 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'}
          >
            {handleTextLanguage('Apply')}
          </button>
        </div>
      </form>
    </div>
  )
}
