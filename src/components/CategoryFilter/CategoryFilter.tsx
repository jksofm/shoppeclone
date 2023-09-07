/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import pathRoute from 'src/constants/path'
import productApi from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import { useAppContext } from 'src/contexts/app.context'
export default function CategoryFilter({
  categoryId,
  setCategoryId
}: {
  categoryId: string
  setCategoryId: React.Dispatch<React.SetStateAction<string>>
}) {
  const { handleTextLanguage } = useAppContext()
  const navigate = useNavigate()
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return productApi.getProductCategory()
    }
  })
  const newQueryParams = { ...queryParams, page: 1, category: categoryId }
  const result = new URLSearchParams(newQueryParams as any).toString()
  React.useEffect(() => {
    if (categoryId !== '') {
      navigate(`?${result}`)
    }
  }, [categoryId])
  return (
    <div>
      <Link to={pathRoute.home} className='flex items-center font-bold'>
        {/* <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-6 h-6 mr-3'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
    />
  </svg> */}
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
            d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
          />
        </svg>
        <span className='ml-3'>{handleTextLanguage('All Categories')}</span>
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {data?.data.data.map((item: { _id: string; name: string }) => {
          return (
            <li
              onClick={() => setCategoryId(item._id)}
              key={item._id}
              className={`py-2 pl-5 relative hover:text-slate-500 ${
                categoryId === item._id && 'text-text-active font-bold'
              }`}
            >
              {categoryId === item._id && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5 absolute top-[50%] translate-y-[-50%] left-[-10px]'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              )}
              <Link className='' to={pathRoute.home}>
                {handleTextLanguage(item.name as any)}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
