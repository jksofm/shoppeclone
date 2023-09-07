/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { ProductListConfig } from 'src/models/product/product.type'
import { useNavigate } from 'react-router-dom'

import { PaginationComponent } from '../ButtonPagination/ButtonPagination'

export default function Pagination({
  page_size,
  queryParams,
  setPageCurrent,
  pageCurrent
}: {
  page_size: number
  queryParams: ProductListConfig
  setPageCurrent: (page: number, props?: any) => void
  pageCurrent: number
}) {
  const navigate = useNavigate()
  const newQueryParams = { ...queryParams, page: pageCurrent }

  React.useEffect(() => {
    const result = new URLSearchParams(newQueryParams as any).toString()

    navigate(`?${result}`)
  }, [])

  return (
    <div className='flex flex-wrap mt-12 justify-center'>
      <button
        onClick={() => {
          if (Number(queryParams.page) > 1) {
            const newQueryParams = { ...queryParams, page: Number(queryParams.page) - 1 }
            const result = new URLSearchParams(newQueryParams as any).toString()
            navigate(`?${result}`)

            // setPageCurrent((prev) => prev - 1)
          }
          if (Number(queryParams.page) <= 0) {
            const newQueryParams = { ...queryParams, page: 1 }
            const result = new URLSearchParams(newQueryParams as any).toString()
            navigate(`?${result}`)
            // setPageCurrent(1)
          }
        }}
        disabled={pageCurrent === 1}
        className={`bg-white rounded px-3 py-2 shadow-sm flex items-center justify-center border text-sm hover:bg-slate-200 ${
          pageCurrent === 1 ? 'cursor-not-allowed bg-slate-250 hover:bg-white' : 'cursor-pointer hover:bg-slate-200'
        }`}
      >
        Prev
      </button>

      {/* <ButtonPagination pageCurrent={pageCurrent} page_size={page_size} setPageCurrent={setPageCurrent} /> */}
      {/* <ButtonPagination1 pageCurrent={pageCurrent} page_size={page_size} setPageCurrent={setPageCurrent} /> */}
      <PaginationComponent
        pageCurrent={Number(queryParams.page) || 1}
        page_size={page_size}
        setPageCurrent={setPageCurrent}
      />

      <button
        onClick={() => {
          if (Number(queryParams.page) < page_size) {
            const newQueryParams = { ...queryParams, page: Number(queryParams.page) + 1 }
            const result = new URLSearchParams(newQueryParams as any).toString()
            navigate(`?${result}`)
          }
          if (Number(queryParams.page) === page_size) {
            const newQueryParams = { ...queryParams, page: page_size }
            const result = new URLSearchParams(newQueryParams as any).toString()
            navigate(`?${result}`)
          }
        }}
        className={`bg-white rounded px-3 py-2 shadow-sm flex items-center justify-center border text-sm hover:bg-slate-200 ${
          pageCurrent === page_size
            ? 'cursor-not-allowed bg-slate-250 hover:bg-white'
            : 'cursor-pointer hover:bg-slate-200'
        }`}
      >
        Next
      </button>
    </div>
  )
}
