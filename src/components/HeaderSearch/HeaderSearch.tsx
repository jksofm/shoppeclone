/* eslint-disable @typescript-eslint/no-explicit-any */
import omit from 'lodash/omit'

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'src/hooks/useDebounce'
import useQueryParams from 'src/hooks/useQueryParams'

export default function HeaderSearch() {
  const queryParams = useQueryParams()

  const [value, setValue] = React.useState<string>(queryParams.name || '')
  const debouncedValue = useDebounce<string>(value, 500)
  const navigate = useNavigate()
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  React.useEffect(() => {
    if (debouncedValue.trim() !== '') {
      const newQueryParams = { ...queryParams, name: debouncedValue }
      const result = new URLSearchParams(newQueryParams as any).toString()

      navigate(`?${result}`)
    }
    if (debouncedValue.trim() === '') {
      const newQueryParams = omit(queryParams, ['name'])
      const result = new URLSearchParams({ ...newQueryParams } as any).toString()

      navigate(`?${result}`)
    }
  }, [debouncedValue])
  const handleSearchButton = () => {
    if (debouncedValue.trim() !== '') {
      navigate(`/?name=${debouncedValue}`)
    }
  }
  return (
    <form className='sm:col-span-8 col-span-12'>
      <div className='bg-white rounded-sm p-1 flex'>
        <input
          type='text'
          name='name'
          value={value}
          onChange={handleSearch}
          className='text-black px-3 py-2 flex-grow broder-none outline-none bg-transparent'
          placeholder='Free Ship Đơn từ 0 đồng'
        />
        <button
          onClick={handleSearchButton}
          className='rounded-sm py-2 px-5 flex-shrink-0 bg-primary-color hover:opacity-70'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='white'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </button>
      </div>
    </form>
  )
}
