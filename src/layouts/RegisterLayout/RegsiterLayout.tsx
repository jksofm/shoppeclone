import * as React from 'react'
import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

export interface RegisterLayoutProps {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <RegisterHeader />
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  )
}
