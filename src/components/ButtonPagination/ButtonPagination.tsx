/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import useQueryParams from 'src/hooks/useQueryParams'

export default function ButtonPagination({
  page_size,
  pageCurrent,
  setPageCurrent
}: {
  page_size: number
  pageCurrent: number
  setPageCurrent: (page: number, props?: any) => void
}) {
  // const queryParams = useQueryParams()
  return (
    <>
      {Array(page_size)
        .fill(0)
        .map((_, index) => {
          return (
            // <Link  to={`/${result}&page=${pageCurrent}`}>
            <button
              key={index}
              onClick={() => setPageCurrent(index + 1)}
              className={`rounded px-3 py-2 shadow-sm flex items-center justify-center cursor-pointer border text-sm hover:bg-slate-200 mx-[0.05rem] max-w-[2.2rem] ${
                pageCurrent === index + 1 ? 'bg-primary-color/80 font-bold text-white shadow-sm' : 'bg-white'
              }`}
            >
              {index + 1}
            </button>
            // </Link>
          )
        })}
    </>
  )
}

export function ButtonPaginationMain({
  page_size,
  pageCurrent,
  setPageCurrent
}: {
  page_size: number
  pageCurrent: number
  setPageCurrent: (page: number, props?: any) => void
}) {
  const queryParams = useQueryParams()
  return (
    <>
      {pageCurrent >= 3 && (
        <button
          onClick={() => setPageCurrent(Number(queryParams.page) - 2)}
          className={`rounded px-3 py-2 shadow-sm flex items-center justify-center cursor-pointer border text-sm bg-white hover:bg-slate-200 mx-[0.05rem] max-w-[2.2rem]}`}
        >
          {pageCurrent - 2}
        </button>
      )}
      {pageCurrent >= 2 && (
        <button
          onClick={() => setPageCurrent(Number(queryParams.page) - 1)}
          className={`rounded px-3 py-2 shadow-sm flex items-center justify-center cursor-pointer border text-sm bg-white hover:bg-slate-200 mx-[0.05rem] max-w-[2.2rem]}`}
        >
          {pageCurrent - 1}
        </button>
      )}

      <button
        onClick={() => setPageCurrent(Number(queryParams.page))}
        className={`rounded px-3 py-2 shadow-sm flex items-center justify-center cursor-pointer border text-sm hover:bg-primary-color/60 mx-[0.05rem] max-w-[2.2rem] bg-primary-color/80 font-bold text-white shadow-sm}`}
      >
        {pageCurrent}
      </button>
      {pageCurrent <= page_size - 1 && (
        <button
          onClick={() => setPageCurrent(Number(queryParams.page) + 1)}
          className={`rounded px-3 py-2 shadow-sm flex items-center justify-center cursor-pointer border text-sm bg-white hover:bg-slate-200 mx-[0.05rem] max-w-[2.2rem]}`}
        >
          {pageCurrent + 1}
        </button>
      )}
      {pageCurrent <= page_size - 2 && (
        <button
          onClick={() => setPageCurrent(Number(queryParams.page) + 2)}
          className={`rounded px-3 py-2 shadow-sm flex items-center justify-center cursor-pointer border text-sm bg-white hover:bg-slate-200 mx-[0.05rem] max-w-[2.2rem]}`}
        >
          {pageCurrent + 2}
        </button>
      )}
    </>
  )
}

export function ButtonPaginationStart({
  pageCurrent,
  setPageCurrent,
  page_size
}: {
  pageCurrent: number
  setPageCurrent: (page: number, props?: any) => void
  page_size: number
}) {
  // const queryParams = useQueryParams()
  return (
    <>
      {pageCurrent >= 4 && page_size >= 4 && (
        <button
          onClick={() => setPageCurrent(1)}
          className={`rounded px-3 py-2 shadow-sm flex items-center justify-center cursor-pointer border text-sm bg-white hover:bg-slate-200 mx-[0.05rem] max-w-[2.2rem]}`}
        >
          1
        </button>
      )}
      {pageCurrent >= 5 && page_size >= 5 && (
        <button
          onClick={() => setPageCurrent(2)}
          className={`rounded px-3 py-2 shadow-sm flex items-center justify-center cursor-pointer border text-sm bg-white hover:bg-slate-200 mx-[0.05rem] max-w-[2.2rem]}`}
        >
          2
        </button>
      )}
    </>
  )
}

export function ButtonPaginationEnd({
  page_size,
  pageCurrent,
  setPageCurrent
}: {
  page_size: number
  pageCurrent: number
  setPageCurrent: (page: number, props?: any) => void
}) {
  // const queryParams = useQueryParams()

  return (
    <>
      {pageCurrent <= page_size - 4 && page_size > 4 && (
        <button
          onClick={() => setPageCurrent(page_size - 1)}
          className={`rounded px-3 py-2 shadow-sm flex items-center justify-center cursor-pointer border text-sm bg-white hover:bg-slate-200 mx-[0.05rem] max-w-[2.2rem]}`}
        >
          {page_size - 1}
        </button>
      )}
      {pageCurrent <= page_size - 3 && page_size > 3 && (
        <button
          onClick={() => setPageCurrent(page_size)}
          className={`rounded px-3 py-2 shadow-sm flex items-center justify-center cursor-pointer border text-sm bg-white hover:bg-slate-200 mx-[0.05rem] max-w-[2.2rem]}`}
        >
          {page_size}
        </button>
      )}
    </>
  )
}

export const PaginationComponent = ({
  page_size,
  pageCurrent,
  setPageCurrent
}: {
  page_size: number
  pageCurrent: number
  setPageCurrent: (page: number, props?: any) => void
}) => {
  return (
    <>
      <ButtonPaginationStart page_size={page_size} pageCurrent={pageCurrent} setPageCurrent={setPageCurrent} />
      {pageCurrent >= 6 && page_size > 6 && (
        <div
          className={`rounded px-3 py-2 shadow-sm flex items-center justify-center cursor-pointer border text-sm bg-white hover:bg-slate-200 mx-[0.05rem] max-w-[2.2rem]}`}
          onClick={() => {
            if (pageCurrent === 6 || pageCurrent === 7 || pageCurrent === 8) {
              setPageCurrent(3)
            } else {
              setPageCurrent(6)
            }

            // setPageCurrent((prev) => {
            //   if (prev === 6 || prev === 7 || prev === 8) {
            //     return 3
            //   }
            //   return 6
            // })
          }}
        >
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
              d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
            />
          </svg>
        </div>
      )}
      <ButtonPaginationMain pageCurrent={pageCurrent} page_size={page_size} setPageCurrent={setPageCurrent} />
      {pageCurrent <= 10 && pageCurrent <= page_size - 2 && (
        <div
          className={`rounded px-3 py-2 shadow-sm flex items-center justify-center cursor-pointer border text-sm bg-white hover:bg-slate-200 mx-[0.05rem] max-w-[2.2rem]}`}
          onClick={() => {
            if (pageCurrent === 10) {
              setPageCurrent(13)
            } else {
              setPageCurrent(10)
            }
            // setPageCurrent((prev) => {
            //   if (prev === 10) {
            //     return 13
            //   }
            //   return 10
            // })
          }}
        >
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
              d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
            />
          </svg>
        </div>
      )}
      <ButtonPaginationEnd pageCurrent={pageCurrent} page_size={page_size} setPageCurrent={setPageCurrent} />
    </>
  )
}
