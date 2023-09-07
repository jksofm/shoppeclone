import React from 'react'
import { useAppContext } from 'src/contexts/app.context'

export default function Footer() {
  const { handleTextLanguage } = useAppContext()
  return (
    <footer className='py-16 bg-neutral-100'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          <div className='lg:col-span-1 text-center lg:text-left'>
            <div className='text-footer-text-color text-md lg:text-lg'>{handleTextLanguage('Rights')}</div>
          </div>
          <div className='lg:col-span-2 text-center lg:text-left'>
            <div className='text-footer-text-color text-md lg:text-lg'>{handleTextLanguage('Region')}</div>
          </div>
        </div>
        <div className='text-center my-4 text-sm text-text-color'>{handleTextLanguage('Company')}</div>
        <div className='my-4'>
          <div className='text-center text-sm my-1 text-footer-text-color'>{handleTextLanguage('Location')}</div>
          <div className='text-center text-sm my-1 text-footer-text-color'>{handleTextLanguage('Managerment')}</div>
          <div className='text-center text-sm my-1 text-footer-text-color'>
            {handleTextLanguage('BussinessCertificate')}
          </div>
          <div className='text-center text-sm my-1 text-footer-text-color'>{handleTextLanguage('Rights')}</div>
        </div>
      </div>
    </footer>
  )
}
