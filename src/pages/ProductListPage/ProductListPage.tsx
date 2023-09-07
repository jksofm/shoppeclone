/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import AsideFilter from 'src/components/AsideFilter'
import ProductItem from 'src/components/ProductItem'
import SortProductList from 'src/components/SortProductList'
import useQueryParams from 'src/hooks/useQueryParams'
import Pagination from 'src/components/Pagination'
import ProductItemSkeleton from 'src/components/ProductItemSkeleton'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from 'src/contexts/app.context'
import MobileFilter from 'src/components/MobileFilter'
import { Helmet } from 'react-helmet'

export interface ProductListPageProps {}

export default function ProductListPage(props: ProductListPageProps) {
  const queryParams = useQueryParams()
  const { isSideFilterOpen } = useAppContext()
  // const [pageCurrent, setPageCurrent] = React.useState<number>(Number(queryParams.page) | 1)
  // console.log(Number(queryParams.page))
  const pageCurrent = Number(queryParams.page) | 1
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    },
    staleTime: 3 * 60 * 1000
  })
  // console.log(data?.data.data.paginate.page_size as number)
  // console.log(data)
  const setPageCurrent = (page: number, props?: any) => {
    const newQueryParams = { ...queryParams, page: page, ...props }
    const result = new URLSearchParams(newQueryParams as any).toString()
    navigate(`?${result}`)
  }
  return (
    <>
      <Helmet>
        <title className='title'>Home Page | Shoppee</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <div className='bg-gray-200 py-6'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3 md:col-span-3 md:block hidden'>
              <AsideFilter />
            </div>
            <div className='col-span-12 md:col-span-9'>
              <SortProductList
                pageCurrent={pageCurrent}
                setPageCurrent={setPageCurrent}
                page_size={data?.data.data.pagination.page_size as number}
              />
              {isLoading && (
                <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                  {Array(Number(queryParams.limit) === 0 ? Number(queryParams.limit) : 5)
                    .fill(0)
                    .map((_, index) => {
                      // console.log(index)
                      return <ProductItemSkeleton key={index} />
                    })}
                </div>
              )}
              {!isLoading && (
                <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                  {data &&
                    data.data.data.products.length > 0 &&
                    data.data.data.products.map((item, index) => {
                      return (
                        <div key={item._id}>
                          <ProductItem data={item} />
                        </div>
                      )
                    })}
                  {data && data.data.data.products.length <= 0 && (
                    <div className='xl:col-span-5 md:col-span-3 col-span-1 sm:col-span-2'>
                      Không tìm thấy sản phẩm nào
                    </div>
                  )}
                </div>
              )}

              <Pagination
                page_size={data?.data.data.pagination.page_size as number}
                // page={queryParams.page ? Number(queryParams.page) : (data?.data.data.pagination.page as number)}
                queryParams={queryParams}
                pageCurrent={pageCurrent}
                setPageCurrent={setPageCurrent}
              />
            </div>
          </div>
        </div>
      </div>
      {isSideFilterOpen && <MobileFilter />}
    </>
  )
}
