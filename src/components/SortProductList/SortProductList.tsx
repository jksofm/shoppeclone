/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { sortBy as sortByField } from 'src/constants/filter'
import { useAppContext } from 'src/contexts/app.context'

import useQueryParams from 'src/hooks/useQueryParams'

export default function SortProductList({
  page_size,
  setPageCurrent,
  pageCurrent
}: {
  page_size: number
  setPageCurrent: (page: number, props?: any) => void
  pageCurrent: number
}) {
  const queryParams = useQueryParams()
  const navigate = useNavigate()
  const { setSideFilter, handleTextLanguage } = useAppContext()

  const [sortBy, setSortBy] = React.useState<string>(queryParams.sort_by || '')
  const [sortByPrice, setSortByPrice] = React.useState<string>(queryParams.order || '')

  React.useEffect(() => {
    if (sortBy !== '' && sortBy === 'price') {
      const newQueryParams = { ...queryParams, sort_by: sortBy, page: 1, order: sortByPrice }
      const result = new URLSearchParams(newQueryParams as any).toString()
      navigate(`?${result}`)
    }
    if (sortBy !== '' && sortBy !== 'price') {
      const newQueryParams = { ...queryParams, sort_by: sortBy, page: 1 }
      const result = new URLSearchParams(newQueryParams as any).toString()
      setSortByPrice('')
      navigate(`?${result}`)
    }
  }, [sortBy, sortByPrice])

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>{handleTextLanguage('Sort')}</div>
          <button
            onClick={() => setSortBy(sortByField.view)}
            className={`h-8 px-4 capitalize  rounded-sm  text-sm  text-center ${
              queryParams.sort_by === sortByField.view
                ? 'hover:bg-orange-700 bg-primary-color text-white'
                : 'bg-white text-black hover:bg-slate-100'
            }`}
          >
            {handleTextLanguage('Popular')}
          </button>
          <button
            className={`h-8 px-4 capitalize  rounded-sm  text-sm  text-center ${
              queryParams.sort_by === sortByField.createdAt
                ? 'hover:bg-orange-700 bg-primary-color text-white'
                : 'bg-white text-black hover:bg-slate-100'
            }`}
            onClick={() => setSortBy(sortByField.createdAt)}
          >
            {handleTextLanguage('Latest')}
          </button>
          <button
            className={`h-8 px-4 capitalize  rounded-sm  text-sm  text-center ${
              queryParams.sort_by === sortByField.sold
                ? 'hover:bg-orange-700 bg-primary-color text-white'
                : 'bg-white text-black hover:bg-slate-100'
            }`}
            onClick={() => setSortBy(sortByField.sold)}
          >
            {handleTextLanguage('BestSelling')}
          </button>
          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setSortBy(sortByField.price)
              setSortByPrice(event.target.value)
            }}
            className='h-8 px-4 capitalize bg-white text-sm'
            defaultValue=''
            value={sortByPrice}
          >
            <option value='' disabled>
              {handleTextLanguage('Price')}
            </option>
            <option value='asc'> {handleTextLanguage('PriceMax')}</option>
            <option value='desc'>{handleTextLanguage('PriceMin')}</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div className=''>
            <span className='text-primary-color'>{queryParams.page || pageCurrent || 1}</span>
            <span>/{page_size}</span>
          </div>
          <div className='ml-2'>
            <button
              className={`px-3 h-8 rounded-tl-sm border rounded bl-sm  hover:bg-slage-100  shadow-sm ${
                pageCurrent === 1 ? 'cursor-not-allowed bg-white/60' : 'cursor-pointer bg-white'
              }`}
              onClick={() => {
                if (pageCurrent > 1) {
                  setPageCurrent(Number(queryParams.page) - 1)
                }
                if (pageCurrent <= 0) {
                  setPageCurrent(1)
                }
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button
              className={`px-3 h-8 rounded-tl-sm border rounded bl-sm  hover:bg-slage-100  shadow-sm ${
                pageCurrent === page_size ? 'cursor-not-allowed bg-white/60' : 'cursor-pointer bg-white'
              }`}
              onClick={() => {
                if (pageCurrent < page_size) {
                  setPageCurrent(Number(queryParams.page) + 1)
                }
                if (pageCurrent === page_size) {
                  setPageCurrent(page_size)
                }
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setSideFilter(true)
        }}
        className='md:hidden cursor-pointer hover:opacity-80 flex gap-2 mt-6 items-center bg-white p-2 rounded-sm'
      >
        <div>
          <svg
            className='w-6 h-6 text-gray-800 dark:text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 10'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeWidth={2}
              d='M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01'
            />
          </svg>
        </div>
        <div className='mr-4'>{handleTextLanguage('Filter')}</div>
      </div>
    </div>
  )
}
