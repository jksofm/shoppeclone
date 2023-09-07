import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import pathRoute from 'src/constants/path'
import { useAppContext } from 'src/contexts/app.context'
import classNames from 'classnames'
import { config } from '../../constants/config'
export default function NavUser() {
  const { userInfo, handleTextLanguage } = useAppContext()

  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 bg-[#e5e7eb] py-4'>
        <Link
          to={pathRoute.profile}
          className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'
        >
          <img src={`${config.baseURL}/images/${userInfo.avatar}`} alt='' className='h-full w-full object-cover' />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>{userInfo?.email}</div>
          <Link to={pathRoute.profile} className='flex items-center capitalize text-gray-500'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            {handleTextLanguage('ChangeProfile')}
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={pathRoute.profile}
          className={({ isActive }) =>
            classNames('flex items-center capitalize  transition-colors', {
              'text-primary-color': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='h-full w-full' />
          </div>
          {handleTextLanguage('My Account')}
        </NavLink>
        <NavLink
          to={pathRoute.changePassword}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center capitalize transition-colors', {
              'text-primary-color': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='h-full w-full' />
          </div>
          {handleTextLanguage('ChangePassword')}
        </NavLink>
        <NavLink
          to={pathRoute.purchaseControl}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center  capitalize transition-colors', {
              'text-primary-color': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078' alt='' className='h-full w-full' />
          </div>
          {handleTextLanguage('Purchase List')}
        </NavLink>
      </div>
    </div>
  )
}
