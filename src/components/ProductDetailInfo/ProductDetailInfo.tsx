import React from 'react'
import { Product } from 'src/models/product/product.type'

import { StarComponentRatings } from '../ProductItem/ProductItem'
import { formatCurrentcy } from 'src/utils/format'
import QuantityController from '../QuantityController'
import { useNavigate } from 'react-router-dom'

export default function ProductDetailInfo({
  productDetail,
  addToCart,
  product_id
}: {
  productDetail: Product
  addToCart: ({
    buy_count,
    product_id,
    handleSuccess
  }: {
    product_id: string
    buy_count: number
    handleSuccess?: () => void
  }) => void
  product_id: string
}) {
  const navigate = useNavigate()
  const rating = Number(productDetail.rating)
  const discount = 100 - Math.ceil((Number(productDetail.price) / Number(productDetail.price_before_discount)) * 100)
  const [countProduct, setCountProduct] = React.useState<number>(1)
  const handleDecrease = () => {
    setCountProduct((prev: number) => {
      if (prev <= 1) {
        return 1
      }
      return prev - 1
    })
  }
  const handleIncrease = () => {
    setCountProduct((prev: number) => {
      if (prev >= productDetail.quantity) {
        return productDetail.quantity
      }
      return prev + 1
    })
  }
  const handleBuyImmidiate = () => {
    addToCart({
      buy_count: countProduct,
      product_id,
      handleSuccess: () => {
        navigate(`/cart-page?buyImimidiate=${product_id}`, {
          state: {
            id: product_id
          }
        })
        // console.log('why')
      }
    })
  }
  return (
    <div className='col-span-1 lg:col-span-7'>
      <div className='text-xl font-medium uppercase'>{productDetail.name}</div>
      <div className='mt-2 flex justify-start gap-4 divide-x'>
        <div className='flex items-center'>
          <span className='mr-2 text-primary-color font-medium underline underline-offset-[6px]'>
            {productDetail.rating}
          </span>
          {Array.from({ length: Math.floor(rating) }, (_, i) => {
            return (
              <StarComponentRatings width='w-4' height='h-4' color='fill-[#ee4d2d]' key={i} fillStarPercent='100%' />
            )
          })}
          {rating - Math.floor(rating) > 0 && (
            <StarComponentRatings
              color='fill-[#ee4d2d]'
              width='w-4'
              height='h-4'
              fillStarPercent={`${((rating - Math.floor(rating)) / 1) * 100}%`}
            />
          )}
        </div>
        <div className='flex items-center'>
          <span className='underline-offset-[6px] ml-6 underline mr-1 text-[#222]'>
            {' '}
            {productDetail.view > 1000 ? `${productDetail.view / 1000}k` : productDetail.view}
          </span>

          <span className='text-[#767676] text-[0.875rem]'>Đã xem</span>
        </div>

        <div className='flex items-center '>
          <span className='mr-1 ml-6 text-[#222]'>
            {productDetail.sold > 1000 ? `${productDetail.sold / 1000}k` : productDetail.sold}
          </span>

          <span className='text-[#767676] text-[0.875rem]'>Đã bán</span>
        </div>
      </div>
      <div className='w-full px-6 py-4 bg-gray-200 mt-8 rounded-sm'>
        <div className='flex items-center gap-3'>
          <div className='line-through text-gray-500'>
            <span className='text-xs'>₫</span>
            {formatCurrentcy(productDetail.price_before_discount)}
          </div>
          <div className=' text-primary-color truncate ml-2 text-[2rem]'>
            <span className='text-[1.5rem]'>₫</span>
            {formatCurrentcy(productDetail.price)}
          </div>
          <div className='bg-primary-color text-white px-1 py-[1.6px] text-xs'>{discount}% GIẢM </div>
        </div>
      </div>
      <div className='mt-8 flex items-center'>
        <div className='capitalize text-gray-500'>Deal Sốc</div>
        <div className='ml-10 text-primary-color bg-primary-color/20 border-none py-1 px-2'>Mua kèm deal sốc</div>
      </div>
      <div className='mt-8 flex items-center'>
        <div className='capitalize text-gray-500'>Bảo hiểm</div>
        <div className='ml-10 text-black'>Bảo hiểm Quyền lợi tiêu dùng</div>
        <div className='bg-primary-color rounded-md rounded-bl-none text-white text-[10px] font-medium h-[16px] leading-[16px] ml-1 px-[5px] py-0 text-center '>
          Mới
        </div>
      </div>
      <div className='mt-8 flex items-center'>
        <div className='capitalize text-gray-500'>Số lượng</div>
        <QuantityController
          isErrorDisplay
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
          countProduct={countProduct}
          setCountProduct={setCountProduct}
          quantity={productDetail.quantity}
        />
        <div className='text-md text-[#757575] ml-4'>{productDetail.quantity} sản phẩm có sẵn</div>
      </div>
      <div className='flex items-center gap-6 mt-10'>
        <button
          onClick={() => {
            addToCart({ buy_count: countProduct, product_id })
          }}
          className='bg-[rgba(255,87,34,0.1)] flex py-3 px-6 border items-center text-primary-color border-primary-color gap-2 hover:bg-primary-color/20'
        >
          <span>
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
                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
          </span>

          <span>Thêm vào giỏ hàng</span>
        </button>

        <button
          onClick={handleBuyImmidiate}
          className='bg-primary-color flex py-[0.9rem] px-12 border items-center text-white font-medium border-primary-color gap-2 hover:bg-primary-color/80'
        >
          {/* <Link to={`/cart-page?buyImimidiate=${product_id}`} state={{ test: 'test' }}> */}
          <span>Mua ngay</span>
          {/* </Link> */}
        </button>
      </div>
    </div>
  )
}
