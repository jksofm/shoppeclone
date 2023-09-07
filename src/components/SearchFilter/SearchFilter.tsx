import React from 'react'
import { Link } from 'react-router-dom'
import pathRoute from 'src/constants/path'
import PriceFilter from '../PriceFilter'
import StarFilter from '../StarFilter'
import { useAppContext } from 'src/contexts/app.context'
export default function SearchFilter() {
  const { handleTextLanguage } = useAppContext()
  return (
    <div className='mt-4'>
      <Link to={pathRoute.home} className='flex items-center font-bold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 mr-3'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
          />
        </svg>

        <span className='ml-2'>{handleTextLanguage('Filter')}</span>
      </Link>
      {/* <div className='bg-gray-300 h-[1px] my-4' /> */}
      <PriceFilter />

      <div className='bg-gray-300 h-[1px] my-4' />
      <StarFilter />
      <div className='bg-gray-300 h-[1px] my-4' />
    </div>
  )
}
