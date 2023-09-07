/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Purchase } from 'src/models/product/purchase.type'
import { formatCurrentcy } from 'src/utils/format'
import QuantityController from '../QuantityController'
import { useMutation } from '@tanstack/react-query'
import purchaseApi from 'src/apis/purchase.api'
import { useQueryClient } from '@tanstack/react-query'
import { purchaseStatus } from 'src/constants/purchase'
import { useDebounce } from 'src/hooks/useDebounce'
import { toast } from 'react-toastify'
import PopupConfirm from '../PopupConfirm'
import { produce } from 'immer'
import { generateNameId } from 'src/utils/common'
export default function ProductItemCartPage({
  data,
  setProductsChoose,

  setCheckedAll,

  productsChoose
}: {
  data: Purchase
  setProductsChoose: React.Dispatch<
    React.SetStateAction<
      {
        product_id: string
        buy_count: number
        price: number
        price_before: number
        checked: boolean
      }[]
    >
  >

  setCheckedAll: React.Dispatch<React.SetStateAction<boolean>>
  dataLength: number
  productsChoose: {
    product_id: string
    buy_count: number
    price: number
    price_before: number
    checked: boolean
  }[]
}) {
  const [countProduct, setCountProduct] = useState<number>(data.buy_count)
  // console.log(data.buy_count)
  const queryClient = useQueryClient()
  const newlink = `/products/${generateNameId({ name: data.product.name, id: data.product._id })}`
  const [showPopup, setShowPopUp] = useState<boolean>(false)
  const debounceCountProduct = useDebounce<number>(countProduct, 1000)
  if (!data) {
    return null
  }
  // const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(e.target.checked)
  // }
  const updateCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.updatePurchaseInCart(body)
  })

  const deleteCartMutation = useMutation({
    mutationFn: (body: string[]) => purchaseApi.deletePurchaseInCart(body),
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases', { status: purchaseStatus.inCart }])
      setProductsChoose((prev) => {
        return prev.filter((item) => item.product_id !== data.product._id)
      })
    }
  })
  const handleUpdateCart = (value: number) => {
    updateCartMutation.mutate(
      { buy_count: value, product_id: data.product._id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['purchases', { status: purchaseStatus.inCart }])
        }
      }
    )
  }
  const handleIncrease = () => {
    if (countProduct < data.product.quantity) {
      setCountProduct((prev) => {
        handleUpdateCart(prev + 1)
        return prev + 1
      })
    } else {
      setCountProduct(data.product.quantity)
      handleUpdateCart(data.product.quantity)
    }
  }
  const handleDecrease = () => {
    if (countProduct > 1) {
      setCountProduct((prev) => {
        handleUpdateCart(prev - 1)
        return prev - 1
      })
    } else {
      // setCountProduct(1)
      // handleUpdateCart(1)
      setShowPopUp(true)
      setCountProduct(1)
    }
  }

  const handleDelete = () => {
    deleteCartMutation.mutate([data._id])
  }

  useEffect(() => {
    if (countProduct !== data.buy_count) {
      // console.log('debounce')
      if (countProduct <= data.product.quantity && countProduct > 0) {
        // console.log('tesss')
        handleUpdateCart(countProduct)
      }
      if (countProduct === 0) {
        setShowPopUp(true)
        setCountProduct(1)
      }
      if (countProduct >= data.product.quantity) {
        toast.error(`Số lượng sản phẩm chỉ còn ${data.product.quantity}`)
      }
    }
  }, [debounceCountProduct])

  useEffect(() => {
    // console.log('prev', productsChoose)
    if (data.buy_count !== countProduct) {
      // console.log('countProduct', countProduct)
      // console.log('buy_count', data.buy_count)
      setProductsChoose(
        produce((draft) => {
          const index = productsChoose.findIndex((item) => item.product_id === data.product._id)
          if (index! == -1 && draft[index]) {
            draft[index].buy_count = data.buy_count
          }
        })
      )
    }
  }, [countProduct])

  useEffect(() => {
    const newArr = productsChoose.filter((item) => item.checked === true)

    if (newArr.length === productsChoose.length && newArr.length > 0) {
      // console.log('productsChoose')
      setCheckedAll(true)
    }
    if (newArr.length !== productsChoose.length && newArr.length >= 0) {
      setCheckedAll(false)
    }
  }, [productsChoose])

  return (
    <>
      <div
        key={data._id}
        className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
      >
        <div className='col-span-6'>
          <div className='flex'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-orange'
                checked={productsChoose.find((item) => item.product_id === data.product._id)?.checked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  // handleChecked(e)
                  setProductsChoose((prev) => {
                    const newArr = prev.filter((item) => item.product_id !== data.product._id) || []
                    return [
                      ...newArr,
                      {
                        buy_count: countProduct,
                        product_id: data.product._id,
                        price: Number(data.product.price),
                        price_before: Number(data.product.price_before_discount),
                        checked: e.target.checked
                      }
                    ]
                  })
                }}
              />
            </div>
            <div className='flex-grow'>
              <div className='flex'>
                <Link className='h-20 w-20 flex-shrink-0' to={newlink}>
                  <img alt={data.product.name} src={data.product.image} />
                </Link>
                <div className='flex-grow px-2 pt-1 pb-2'>
                  <Link to={newlink} className='text-left line-clamp-2'>
                    {data.product.name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-6'>
          <div className='grid grid-cols-5 items-center'>
            <div className='col-span-2'>
              <div className='flex items-center justify-center'>
                <span className='text-gray-300 line-through'>
                  ₫{formatCurrentcy(data.product.price_before_discount)}
                </span>
                <span className='ml-3'>₫{formatCurrentcy(data.product.price)}</span>
              </div>
            </div>
            <div className='col-span-1'>
              <QuantityController
                quantity={data.product.quantity}
                setCountProduct={setCountProduct}
                countProduct={countProduct}
                handleDecrease={handleDecrease}
                handleIncrease={handleIncrease}
                // handleChange={handleChange}
              />
            </div>
            <div className='col-span-1'>
              <span className='text-orange ml-8'>₫{formatCurrentcy(data.product.price * data.buy_count)}</span>
            </div>
            <div className='col-span-1'>
              <button
                onClick={() => {
                  setShowPopUp(!showPopup)
                }}
                className='bg-none text-black transition-colors hover:text-orange'
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <PopupConfirm
          message='Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?'
          handlePopup={handleDelete}
          setShowPopUp={setShowPopUp}
          title='Chú ý'
        />
      )}
    </>
  )
}
