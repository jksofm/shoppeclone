/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from 'src/contexts/app.context'
import useQueryParams from 'src/hooks/useQueryParams'
export default function StarFilter() {
  const { handleTextLanguage } = useAppContext()
  return (
    <ul className='my-3'>
      <div className='mb-2'>{handleTextLanguage('Review')}</div>

      <StarComponent emptyStar={0} fillStar={5} />
      <StarComponent emptyStar={1} fillStar={4} />
      <StarComponent emptyStar={2} fillStar={3} />
      <StarComponent emptyStar={3} fillStar={2} />
      <StarComponent emptyStar={4} fillStar={1} />
    </ul>
  )
}

export function StarComponent({ emptyStar, fillStar }: { fillStar: number; emptyStar: number }) {
  const queryParams = useQueryParams()
  const navigate = useNavigate()
  const { handleTextLanguage } = useAppContext()

  return (
    <li
      onClick={() => {
        const newQueryParams = { ...queryParams, rating_filter: fillStar, page: 1 }
        const result = new URLSearchParams(newQueryParams as any).toString()
        navigate(`?${result}`)
      }}
      // className='py-1 hover:opacity-75'
      className={`${
        fillStar === Number(queryParams.rating_filter) ? 'py-1 hover:opacity-75' : 'py-1 hover:opacity-75'
      } `}
    >
      <Link to='' className='flex items-center text-sm'>
        {Array(fillStar)
          .fill(0)
          .map((_, index) => {
            return (
              <div key={index}>
                <svg viewBox='0 0 9.5 8' className='w-4 h-4 mr-1'>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop
                        offset={0}
                        // stopColor={`${fillStar === Number(queryParams.rating_filter) ? '#69634e' : '#ffca11'} `}
                        stopColor='#ffca11'
                      />

                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            )
          })}

        {Array(emptyStar)
          .fill(0)
          .map((_, index) => {
            return (
              <div key={index}>
                <svg viewBox='0 0 30 30' className='w-4 h-4 mr-1'>
                  <defs>
                    <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                      <stop offset='0%' stopColor='#FFD211' />
                      <stop offset='100%' stopColor='#FFAD27' />
                    </linearGradient>
                  </defs>
                  <path
                    fill='none'
                    fillRule='evenodd'
                    stroke='url(#star__hollow)'
                    strokeWidth={2}
                    d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                  />
                </svg>
              </div>
            )
          })}
        {fillStar < 5 && (
          <span className={`${fillStar === Number(queryParams.rating_filter) ? 'ml-2 font-bold' : 'ml-2'} `}>
            {handleTextLanguage('Upwards')}
          </span>
        )}
      </Link>
    </li>
  )
}
