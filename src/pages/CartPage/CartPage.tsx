import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseApi from 'src/apis/purchase.api'
import ProductItemCartPage from 'src/components/ProductItemCartPage'
import ProductItemSkeleton from 'src/components/ProductItemSkeleton'
import { purchaseStatus } from 'src/constants/purchase'

// import QuantityController from 'src/components/QuantityController'
import { formatCurrentcy } from 'src/utils/format'
import { Purchase } from 'src/models/product/purchase.type'
import PopupConfirm from 'src/components/PopupConfirm'
import { useAppContext } from 'src/contexts/app.context'

export default function CartPage() {
  // const location = useLocation()

  // const [productsChoose, setProductsChoose] = useState<
  //   { product_id: string; buy_count: number; price: number; price_before: number; checked: boolean }[]
  // >([])
  const { productsChoose, setProductsChoose } = useAppContext()
  // console.log(location)

  const queryClient = useQueryClient()
  const [checkedAll, setCheckedAll] = useState<boolean>(false)
  const [confirmBuy, setConfirmBuy] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParams = Object.fromEntries([...searchParams])

  const getProductsInCart = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases(purchaseStatus.inCart),

    onSuccess: (data) => {
      // console.log('getProductsInCart')
      if (productsChoose.length === 0) {
        // console.log(location.state)
        const newArr = (data.data.data as Purchase[]).map((item) => {
          if (queryParams.buyImimidiate && queryParams.buyImimidiate === item.product._id) {
            // console.log('immit', item.buy_count)
            return {
              checked: true,
              product_id: item.product._id,
              buy_count: item.buy_count,
              price: item.price,
              price_before: item.price_before_discount
            }
          }
          return {
            checked: false,
            product_id: item.product._id,
            buy_count: item.buy_count,
            price: item.price,
            price_before: item.price_before_discount
          }
        })
        console.log(newArr)
        setProductsChoose(newArr)
      } else {
        const newArr: {
          product_id: string
          buy_count: number
          price: number
          price_before: number
          checked: boolean
        }[] = []

        productsChoose.forEach((item) => {
          ;(data.data.data as Purchase[]).forEach((itemData) => {
            if (itemData.product._id === item.product_id) {
              if (queryParams.buyImimidiate && queryParams.buyImimidiate === item.product_id) {
                newArr.push({
                  ...item,
                  buy_count: itemData.buy_count,
                  checked: true
                })
              } else {
                newArr.push({
                  ...item,
                  buy_count: itemData.buy_count
                })
              }
            }
          })
        })

        setProductsChoose(newArr)
      }
      if (searchParams.has('buyImimidiate')) {
        searchParams.delete('buyImimidiate')
        setSearchParams(searchParams)
      }
    },
    keepPreviousData: true
  })

  const buyProducts = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }[]) => purchaseApi.buyProducts(body)
  })
  const handleBuyProducts = () => {
    const newArr = productsChoose.filter((item) => item.checked === true) || []
    if (newArr.length > 0) {
      const newArr1 = newArr.map((item) => {
        return {
          product_id: item.product_id,
          buy_count: item.buy_count
        }
      })
      buyProducts.mutate(newArr1, {
        onSuccess: () => {
          toast.success('Mua sản phẩm thành công!')
          queryClient.invalidateQueries(['purchases', { status: purchaseStatus.inCart }])
          setConfirmBuy(false)
        }
      })
    } else {
      toast.error('Chọn sản phẩm bạn muốn mua!')
    }
  }

  const ProductInfoArray = getProductsInCart.data?.data.data || []
  const totalMoney = useMemo(
    () =>
      productsChoose
        .filter((item) => item.checked === true)
        .reduce((acc, int) => {
          return int.buy_count * int.price + acc
        }, 0) || 0,
    [productsChoose]
  )

  const totalMoneyBefore = useMemo(
    () =>
      productsChoose
        .filter((item) => item.checked === true)
        .reduce((acc, int) => {
          return int.buy_count * int.price_before + acc
        }, 0) || 0,
    [productsChoose]
  )

  const totalDiscount = totalMoney - totalMoneyBefore

  const handleCheckedAll = (value: boolean) => {
    console.log(value)
    setProductsChoose((prev) => {
      // console.log(prev)
      const newArr = prev.map((item) => {
        return {
          ...item,
          checked: value
        }
      })
      return newArr
    })
  }
  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  return (
    <>
      <div className='bg-neutral-100 py-16'>
        <div className='container'>
          {getProductsInCart.isLoading && (
            <div className='flex flex-col'>
              <ProductItemSkeleton />
              <ProductItemSkeleton />
              <ProductItemSkeleton />
              <ProductItemSkeleton />
            </div>
          )}
          {ProductInfoArray.length > 0 && !getProductsInCart.isLoading && (
            <>
              <div className='overflow-auto'>
                <div className='min-w-[1200px]'>
                  <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                    <div className='col-span-6'>
                      <div className='flex items-center'>
                        {/* <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input type='checkbox' className='h-5 w-5 accent-orange' checked={true} onChange={() => {}} />
                      </div> */}
                        <div className='flex-grow text-black'>Sản phẩm</div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 text-center'>
                        <div className='col-span-2'>Đơn giá</div>
                        <div className='col-span-1'>Số lượng</div>
                        <div className='col-span-1'>Số tiền</div>
                        <div className='col-span-1'>Thao tác</div>
                      </div>
                    </div>
                  </div>
                  {ProductInfoArray.length === 0 && (
                    <div className='my-3 bg-white p-5'>Không có sản phẩm nào trong giỏ thành</div>
                  )}
                  {ProductInfoArray.length > 0 && (
                    <div className='my-3 rounded-sm bg-white p-5 shadow'>
                      {ProductInfoArray.map((item) => (
                        <ProductItemCartPage
                          setProductsChoose={setProductsChoose}
                          data={item}
                          key={item._id}
                          setCheckedAll={setCheckedAll}
                          dataLength={ProductInfoArray.length}
                          productsChoose={productsChoose}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={checkedAll}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCheckedAll(e.target.checked)
                        handleCheckedAll(e.target.checked)
                      }}
                    />
                  </div>
                  <button
                    className='mx-3 border-none bg-none'
                    onClick={() => {
                      setCheckedAll(true)
                      handleCheckedAll(true)
                    }}
                  >
                    Chọn tất cả ({productsChoose.filter((item) => item.checked === true).length})
                  </button>
                  <button
                    className='mx-3 border-none bg-none'
                    onClick={() => {
                      setCheckedAll(false)
                      handleCheckedAll(false)
                    }}
                  >
                    Xóa
                  </button>
                </div>

                <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                  <div>
                    <div className='flex items-center sm:justify-end'>
                      <div>
                        Tổng thanh toán ({productsChoose.filter((item) => item.checked === true).length} sản phẩm):
                      </div>
                      <div className='ml-2 text-2xl text-orange'>₫{formatCurrentcy(totalMoney)}</div>
                    </div>
                    <div className='flex items-center text-sm sm:justify-end'>
                      <div className='text-gray-500'>Tiết kiệm</div>
                      <div className='ml-6 text-orange'>₫{formatCurrentcy(totalDiscount)}</div>
                    </div>
                  </div>
                  <button
                    className='mt-5 ml-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                    onClick={() => {
                      const check = productsChoose.some((item) => item.checked === true)
                      if (check) {
                        setConfirmBuy(true)
                      } else {
                        toast.error('Chọn sản phẩm bạn muốn mua!')
                      }
                    }}
                    disabled={buyProducts.isLoading}
                  >
                    Mua hàng
                  </button>
                </div>
              </div>
            </>
          )}
          {ProductInfoArray.length < 0 && !getProductsInCart.isLoading && (
            <div className='text-center'>
              {/* <img src={noproduct} alt='no purchase' className='mx-auto h-24 w-24' /> */}
              <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
              <div className='mt-5 text-center'>
                <Link
                  to='/'
                  className=' rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
                >
                  Mua ngay
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {confirmBuy && (
        <PopupConfirm
          message='Bạn có chắc chắn muốn mua các sản phẩm trong giỏ hàng?'
          handlePopup={handleBuyProducts}
          setShowPopUp={setConfirmBuy}
          title='Xác nhận'
        />
      )}
    </>
  )
}
