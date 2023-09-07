/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { useAppContext } from 'src/contexts/app.context'

export default function PopupConfirm({
  title,
  message,
  handlePopup,
  setShowPopUp
}: {
  title: string
  message: string
  handlePopup: () => void
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { handleTextLanguage } = useAppContext()
  return (
    <div
      aria-hidden='true'
      className='fixed top-0 left-0 right-0 z-50 w-[100vw] p-4 overflow-x-hidden bg-[rgba(0,0,0,0.4)] h-[100vh]'
    >
      <div className='absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full max-w-2xl max-h-full'>
        {/* Modal content */}
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          {/* Modal header */}
          <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{title}</h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              onClick={() => setShowPopUp(false)}
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
              <span onClick={() => setShowPopUp(false)} className='sr-only'>
                Close modal
              </span>
            </button>
          </div>
          {/* Modal body */}
          <div className='p-6 space-y-6'>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>{message}</p>
          </div>
          {/* Modal footer */}
          <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
            <button
              type='button'
              onClick={handlePopup}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              {handleTextLanguage('Agree')}
            </button>
            <button
              type='button'
              className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
              onClick={() => setShowPopUp(false)}
            >
              {handleTextLanguage('Refuse')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
