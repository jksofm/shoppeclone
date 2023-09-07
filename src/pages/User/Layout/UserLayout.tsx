import * as React from 'react'
import NavUser from 'src/components/NavUser'

export interface MainLayoutProps {
  children?: React.ReactNode
}

export default function UserLayout({ children }: MainLayoutProps) {
  return (
    <div className='grid grid-cols-12 py-10 px-4 container'>
      <div className='lg:col-span-3 col-span-12'>
        <NavUser />
      </div>
      <div className='lg:col-span-9 col-span-12 mt-7 lg:mt-0'>{children}</div>
    </div>
  )
}
