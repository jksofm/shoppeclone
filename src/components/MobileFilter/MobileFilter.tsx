/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import AsideFilter from '../AsideFilter'
import { useAppContext } from 'src/contexts/app.context'

export default function MobileFilter() {
  const { setSideFilter } = useAppContext()
  return (
    <div
      aria-hidden='true'
      className='fixed top-0 left-0 right-0 z-[9999] w-[100vw] p-4 overflow-x-hidden bg-[rgba(0,0,0,0.4)] h-[100vh]'
    >
      <div className='absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full max-w-2xl max-h-full'>
        {/* Modal content */}
        <div className='relative bg-white rounded-lg shadow'>
          <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Lọc sản phẩm</h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              onClick={() => setSideFilter(false)}
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span onClick={() => setSideFilter(false)} className='sr-only'>
                Close modal
              </span>
            </button>
          </div>

          <div className='p-6 space-y-6'>
            <AsideFilter />
          </div>
        </div>
      </div>
    </div>
  )
}
