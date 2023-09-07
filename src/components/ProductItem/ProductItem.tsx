/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from 'src/models/product/product.type'
import { generateNameId, getIdFromURL } from 'src/utils/common'
import { formatCurrentcy } from 'src/utils/format'

export const StarComponentRatings = ({
  fillStarPercent,
  color,
  width,
  height
}: {
  fillStarPercent: string
  color?: string
  width?: string
  height?: string
}) => {
  return (
    <div className='flex items-center'>
      <div className='relative'>
        <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: fillStarPercent }}>
          <svg
            enableBackground='new 0 0 15 15'
            viewBox='0 0 15 15'
            x={0}
            y={0}
            className={`${width ? width : 'w-3'} ${height ? height : 'h-3'} ${
              color ? color : 'fill-yellow-300'
            } text-yellow-300`}
          >
            <polygon
              points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </svg>
        </div>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className={`${width ? width : 'w-3'} ${height ? height : 'h-3'} fill-slate-300 text-yellow-300`}
        >
          <polygon
            points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit={10}
          />
        </svg>
      </div>
    </div>
  )
}
export default function ProductItem({ data }: { data: Product }) {
  const {
    _id,

    image,

    name,
    price,
    price_before_discount,
    quantity,
    rating,
    sold
  } = data

  const newlink = `/products/${generateNameId({ name: data.name, id: data._id })}`
  // console.log(newlink)

  return (
    <Link to={newlink} state={{ test: 'new' }}>
      <div className='bg-white shadow-sm rounded-sm z-[0] hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative'>
          <img className='absolute top-0 w-full left-0 bg-white h-full object-cover' src={image} alt='Product Image' />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs md:text-sm'>{name}</div>
        </div>
        <div className='flex items-center-mt-3 pt-2 pl-2'>
          <div className='line-through max-w-[50%] text-gray-500 truncate'>
            <span className='text-xs'>₫</span>
            {formatCurrentcy(price_before_discount)}
          </div>
          <div className='max-w-[50%] text-primary-color truncate ml-2'>
            <span className='text-xs'>₫</span>
            {formatCurrentcy(price)}
          </div>
        </div>
        <div className='mt-3 pb-2 pr-2 flex items-center justify-end'>
          {Array.from({ length: Math.floor(rating) }, (_, i) => {
            return <StarComponentRatings key={i} fillStarPercent='100%' />
          })}
          {rating - Math.floor(rating) > 0 && (
            <StarComponentRatings fillStarPercent={`${((rating - Math.floor(rating)) / 1) * 100}%`} />
          )}

          <div className='text-xs ml-2'>Đã bán {sold > 1000 ? `${sold / 1000}k` : `${sold}`}</div>
        </div>
        <div className='text-xs pl-2 pb-2 mt-1'>Còn lại {quantity > 1000 ? `${quantity / 1000}k` : `${quantity}`}</div>
      </div>
    </Link>
  )
}
