import React from 'react'
import { Link } from 'react-router-dom'
import { Purchase } from 'src/models/product/purchase.type'
import { formatCurrentcy } from 'src/utils/format'

export default function HeaderCartItem({ data }: { data: Purchase }) {
  const { product } = data
  return (
    <Link className='flex mt-2 hover:opacity-80' to='/cart-page'>
      <div className='flex-shrink-0'>
        <img className='w-12 object-cover rounded-sm' src={product.image} alt='Product' />
      </div>
      <div className='flex flex-grow ml-2 overflow-hidden items-center'>
        <div className='truncate'>{product.name}</div>
      </div>
      <div className='ml-2 flex-shrink-0 flex items-center'>
        <span className='text-primary-color'>
          {data.buy_count} x ₫{formatCurrentcy(product.price)}
        </span>
      </div>
    </Link>
  )
}
