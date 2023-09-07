/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { Product } from 'src/models/product/product.type'

export default function ProductDetailImage({ productDetail }: { productDetail: Product }) {
  const [activePictureId, setActivePictureId] = React.useState<number>(0)
  const imagesArray = productDetail.images.slice(0, 5)
  const imageRef = React.useRef<HTMLImageElement>(null)
  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()

    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    // const { offsetX, offsetY } = event.nativeEvent
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)
    /// Offset la tọa độ của con trỏ chuật trong element
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleLeave = () => {
    imageRef.current?.removeAttribute('style')
  }
  return (
    <div className='cols-span-1 lg:col-span-5'>
      <div
        className='relative w-full pt-[100%] hover:cursor-zoom-in shadow-sm overflow-hidden'
        onMouseMove={handleZoom}
        onMouseLeave={handleLeave}
      >
        <img
          className='absolute pointer-events-none top-0 left-0 w-full h-full bg-white object-cover'
          src={imagesArray[activePictureId]}
          alt={productDetail?.name}
          ref={imageRef}
        />
      </div>
      <div className='relative mt-4 grid grid-cols-5 gap-1'>
        <button
          onClick={() => {
            setActivePictureId((prev) => {
              if (prev <= 0) {
                return 4
              } else {
                return prev - 1
              }
            })
          }}
          className='absolute left-0 top-1/2 z-20 w-5 -translate-y-1/2 bg-black/20 text-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </button>

        <button
          onClick={() => {
            setActivePictureId((prev) => {
              if (prev >= 4) {
                return 0
              } else {
                return prev + 1
              }
            })
          }}
          className='absolute cursor-pointer right-0 top-1/2 z-20 w-5 -translate-y-1/2 bg-black/20 text-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </button>
        {productDetail.images.slice(0, 5).map((item, index) => {
          const isActive = index === activePictureId
          return (
            <div
              onMouseEnter={() => {
                setActivePictureId(index)
              }}
              className='relative w-full pt-[100%]'
              key={index}
            >
              <img
                className='absolute top-0 left-0 cursor-pointer w-full h-full bg-white object-cover'
                src={item}
                alt='Product'
              />
              {isActive && <div className='absolute top-0 left-0 w-full h-full border-2 z-10 border-orange-400'></div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
