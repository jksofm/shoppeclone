import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import React from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import productApi from 'src/apis/product.api'
import purchaseApi from 'src/apis/purchase.api'
import ProductDetailImage from 'src/components/ProductDetailImage'
import ProductDetailInfo from 'src/components/ProductDetailInfo'
import ProductItem from 'src/components/ProductItem'
import { purchaseStatus } from 'src/constants/purchase'
import { getAccessToken, getIdFromURL } from 'src/utils/common'

export default function ProductDetailPage() {
  const { nameId } = useParams()
  const id = getIdFromURL(nameId as string)
  const queryClient = useQueryClient()

  // console.log(id)
  const addToCartData = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.addToCart(body),

    onSuccess: () => {
      toast.success('Thêm vào giỏ hàng thành công!')
    }
  })
  const { data } = useQuery({
    queryKey: ['products', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const queryParamsConfig = {
    page: 1,
    category: data?.data.data.category._id,
    limit: 20
  }
  const { data: ProductList } = useQuery({
    queryKey: ['products', queryParamsConfig],
    queryFn: () => {
      return productApi.getProducts(queryParamsConfig)
    },
    enabled: Boolean(data),
    staleTime: 3 * 60 * 1000
  })
  const productDetail = data?.data.data
  // console.log(productDetail)
  if (!productDetail) {
    return null
  }

  const addToCart = ({
    buy_count,
    product_id,
    handleSuccess
  }: {
    product_id: string
    buy_count: number
    handleSuccess?: () => void
  }) => {
    if (getAccessToken()) {
      addToCartData.mutate(
        { buy_count, product_id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
            if (handleSuccess) {
              ;(handleSuccess as () => void)()
            }
          }
        }
      )
    } else {
      toast.warn('Bạn cần phải đăng nhập!')
    }
  }

  return (
    <div className='bg-gray-200 py-8'>
      <div className='bg-white container p-4 shadow'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-9'>
          <ProductDetailImage productDetail={productDetail} />
          <ProductDetailInfo product_id={id} addToCart={addToCart} productDetail={productDetail} />
        </div>
      </div>
      <div className='bg-white container mt-6 p-6'>
        <div className='capitalize text-md bg-gray-100 w-full border-none p-6 rounded-sm'>CHI TIẾT SẢN PHẨM</div>
        <div
          className='text-black text-sm mt-8 leading-loose'
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetail.description) }}
        ></div>
      </div>

      <div className='bg-white container mt-6 p-6'>
        <div className='capitalize text-md bg-gray-100 w-full border-none p-6 rounded-sm'>CÓ THỂ BẠN CŨNG THÍCH</div>
        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
          {ProductList?.data.data.products.map((item) => {
            return (
              <div key={item._id}>
                <ProductItem data={item} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
