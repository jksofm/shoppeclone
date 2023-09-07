/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import CategoryFilter from '../CategoryFilter'
import SearchFilter from '../SearchFilter'
import { useNavigate } from 'react-router-dom'
import useQueryParams from 'src/hooks/useQueryParams'
import { useAppContext } from 'src/contexts/app.context'

export default function AsideFilter() {
  const queryParams = useQueryParams()
  const [categoryId, setCategoryId] = React.useState<string>(queryParams.category || '')
  const navigate = useNavigate()
  const { handleTextLanguage } = useAppContext()

  return (
    <div className='py-4'>
      <CategoryFilter categoryId={categoryId} setCategoryId={setCategoryId} />
      <SearchFilter />
      <button
        className='bg-primary-color text-sm uppercase w-full text-white py-2 px-5 rounded-sm hover:bg-orange-700'
        onClick={() => {
          const newQueryParams = { page: 1 }
          const result = new URLSearchParams(newQueryParams as any).toString()
          navigate(`?${result}`)
        }}
      >
        {handleTextLanguage('DeleteAllFilters')}
      </button>
    </div>
  )
}
