/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppContext } from 'src/contexts/app.context'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HeaderLanguagePopover = () => {
  const { handleLanguage } = useAppContext()
  return (
    <div className='bg-white relative shadow z-[100000000] rounded-md border outline-none border-gray-200'>
      <div
        onClick={() => {
          handleLanguage('vi')
        }}
        className='flex flex-col py-2 pl-3 pr-12 hover:text-primary-color hover:cursor-pointer'
      >
        Tiếng Việt
      </div>
      <div
        onClick={() => {
          handleLanguage('en')
        }}
        className='flex flex-col py-2 pl-3 pr-12  hover:text-primary-color mt-2 hover:cursor-pointer'
      >
        Tiếng Anh
      </div>
    </div>
  )
}
export default function HeaderLanguage() {
  const { i18n } = useTranslation()

  return (
    <>
      <div className='flex items-center z-[101] py-1 text-sm lg:text-md text-white hover:text-gray-300 cursor-pointer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1'>{i18n.language === 'vi' ? 'Tiếng Việt' : 'Tiếng Anh'}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </div>
    </>
  )
}
