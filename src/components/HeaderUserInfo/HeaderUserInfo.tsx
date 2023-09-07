/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { logoutAccount } from 'src/apis/auth.api'

import { useAppContext } from 'src/contexts/app.context'
import pathRoute from 'src/constants/path'
import { config } from 'src/constants/config'

export const HeaderUserInfoPopover = () => {
  const { setIsAuthenticated, setUser, handleTextLanguage } = useAppContext()

  const logoutAccountMutation = useMutation({
    mutationFn: () => logoutAccount(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setUser({
        _id: '',
        address: '',
        createdAt: '',
        date_of_birth: '',
        email: '',
        name: '',
        phone: '',
        roles: [],
        updatedAt: '',
        avatar: ''
      })
    }
  })
  const handleLogout = () => {
    logoutAccountMutation.mutate()
  }
  return (
    <div className='bg-white relative shadow rounded-md border outline-none border-gray-200'>
      <div className='flex flex-col py-2 pl-3 pr-12 hover:text-primary-color hover:cursor-pointer'>
        <Link to={pathRoute.profile}>{handleTextLanguage('My Account')}</Link>
      </div>
      <div className='flex flex-col py-2 pl-3 pr-12  hover:text-primary-color mt-2 hover:cursor-pointer'>
        <Link to='/me/purchase'>{handleTextLanguage('Purchase List')}</Link>
      </div>

      <div
        onClick={handleLogout}
        className='flex flex-col py-2 pl-3 pr-12  hover:text-primary-color mt-2 hover:cursor-pointer'
      >
        {handleTextLanguage('Logout')}
      </div>
    </div>
  )
}
export default function HeaderUserInfo() {
  const { userInfo } = useAppContext()

  return (
    <div className='flex items-center py-1 text-sm lg:text-md text-white ml-5 hover:text-gray-300 cursor-pointer'>
      <div className='w-6 h-6 mr-2 flex-shrink-0'>
        <img
          className='rounded-full m-full h-full object-cover'
          src={`${config.baseURL}/images/${userInfo.avatar}`}
          alt='avatar'
        />
      </div>
      <div>{userInfo.email}</div>
    </div>
  )
}
