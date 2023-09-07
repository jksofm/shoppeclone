import * as React from 'react'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

export interface MainLayoutProps {
  children?: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  )
}
