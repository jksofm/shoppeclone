import React from 'react'
import { Link } from 'react-router-dom'
import HeaderCartItem from '../HeaderCartItem'
import { useQuery } from '@tanstack/react-query'
import purchaseApi from 'src/apis/purchase.api'

import { Purchase } from 'src/models/product/purchase.type'
import { purchaseStatus } from 'src/constants/purchase'
import { getAccessToken } from 'src/utils/common'
import { useAppContext } from 'src/contexts/app.context'

export function HeaderCartNumber({ count }: { count: number }) {
  return (
    <div className='bg-white text-xs px-2 py-0 rounded-full absolute top-[-20%] left-[1rem] text-primary-color'>
      {count}
    </div>
  )
}
export function HeaderCartPopover() {
  const { handleTextLanguage } = useAppContext()
  const CartRef = React.useRef(null)

  const { data } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases(purchaseStatus.inCart)
  })

  const countProductDisplay = 5
  let remainProducts
  if (data !== undefined) {
    // totalProducts = (data.data.data as Purchase[]).reduce((acc, init) => {
    //   return init.buy_count + acc
    // }, 0)

    const countProducts = (data.data.data as Purchase[]).length
    remainProducts = countProducts > 5 ? countProducts - countProductDisplay : 0
  }
  if (!getAccessToken()) {
    return (
      <div className='bg-white relative shadow rounded-md border outline-none border-gray-200 max-w-[400px] text-sm max-h-[400px] overflow-y-auto '>
        <div className='p-2'>
          <div className='text-gray-400 capitalize'>{handleTextLanguage('RecentlyAdded')}</div>
          <div className='mt-5 p-2'>{handleTextLanguage('NoProductInCart')}</div>
        </div>
      </div>
    )
  }

  if (data !== undefined) {
    return (
      <div
        ref={CartRef}
        className='bg-white relative shadow rounded-md border outline-none border-gray-200 max-w-[400px] text-sm max-h-[400px] overflow-y-auto '
      >
        <div className='p-2'>
          <div className='text-gray-400 capitalize'>{handleTextLanguage('RecentlyAdded')}</div>
          {(data.data.data?.length as number) <= 0 && (
            <div className='mt-5'>{handleTextLanguage('NoProductInCart')}</div>
          )}
          {(data.data.data?.length as number) > 0 && (
            <div className='mt-5'>
              <div className='mt-4'>
                {data?.data.data?.slice(0, countProductDisplay).map((item) => {
                  return <HeaderCartItem key={item._id} data={item} />
                })}

                <div className='mt-6 items-center justify-between flex flex-row'>
                  <div className='capitalize text-xs'>
                    {remainProducts} {handleTextLanguage('MoreProductInCart')}
                  </div>
                  <button className='capitalize text-sm bg-primary-color rounded-md hover:bg-orange-400 text-white px-5 py-2'>
                    <Link to='/cart-page'>{handleTextLanguage('WatchCartPage')}</Link>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default function HeaderCart() {
  const { data } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases(purchaseStatus.inCart)
  })
  let totalProducts

  if (data !== undefined) {
    totalProducts = (data.data.data as Purchase[]).reduce((acc, init) => {
      return init.buy_count + acc
    }, 0)
  }
  return (
    <div className='ml-3 relative'>
      <Link to='/cart-page' className='text-white'>
        {getAccessToken() && <HeaderCartNumber count={totalProducts || 0} />}

        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-7 h-7'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
          />
        </svg>
      </Link>
    </div>
  )
}
