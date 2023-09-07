import React from 'react'
import { toast } from 'react-toastify'

export default function QuantityController({
  countProduct,
  setCountProduct,
  quantity,
  isErrorDisplay,
  handleIncrease,
  handleDecrease // handleChange
}: {
  countProduct: number
  setCountProduct: React.Dispatch<React.SetStateAction<number>>
  quantity: number
  isErrorDisplay?: boolean
  handleIncrease: () => void
  handleDecrease: () => void
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  // console.log('quality controller', countProduct)
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  return (
    <>
      <div className='ml-10 flex items-center relative'>
        <button
          className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
          onClick={handleDecrease}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
          </svg>
        </button>
        <input
          type='number'
          min={1}
          max={quantity}
          className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-l-0 border border-r-0 text-center py-3 flex items-center justify-center border-gray-300 text-gray-700 w-14 h-8'
          value={countProduct}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isNaN(Number(e.target.value))) {
              if (Number(e.target.value) > quantity) {
                setCountProduct(quantity)
                setErrorMessage('Số lượng vượt quá số sản phẩm')
              } else {
                setCountProduct(Number(e.target.value))
                setErrorMessage('')
              }
              if (Number(e.target.value) <= quantity && Number(e.target.value) > 0) {
                // ;(handleChange as (e: React.ChangeEvent<HTMLInputElement>) => void)(e)
              }
            } else {
              toast.error('Vui lòng nhập số!')
            }
          }}
        />
        <button
          className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
          onClick={handleIncrease}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
          </svg>
        </button>

        {isErrorDisplay && (
          <div className=' absolute w-[200%] top-6 left-100 text-sm mt-4 text-primary-color'>{errorMessage}</div>
        )}
      </div>
    </>
  )
}
