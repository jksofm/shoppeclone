import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link, createSearchParams, useSearchParams } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import pathRoute from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'

import { generateNameId } from 'src/utils/common'
import { formatCurrentcy } from 'src/utils/format'
import classNames from 'classnames'
import { PurchaseListStatus } from 'src/models/product/purchase.type'
import { useAppContext } from 'src/contexts/app.context'

import { resources } from 'src/i18n/i18n'
const purchaseTabs: {
  status: PurchaseListStatus
  name: keyof (typeof resources)['vi']['translation']
}[] = [
  { status: purchaseStatus.All, name: 'Tất cả' },
  { status: purchaseStatus.waitConfirm, name: 'Chờ xác nhận' },
  { status: purchaseStatus.waitForDeliver, name: 'Chờ lấy hàng' },
  { status: purchaseStatus.deleivering, name: 'Đang giao' },
  { status: purchaseStatus.deleivered, name: 'Đã giao' },
  { status: purchaseStatus.cancelled, name: 'Đã hủy' }
]

export default function ControlPurchase() {
  const [searchParams] = useSearchParams()
  const { handleTextLanguage } = useAppContext()

  const queryParams: { status?: string } = Object.fromEntries([...searchParams])

  const status: number = Number(queryParams.status) || purchaseStatus.All

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: pathRoute.purchaseControl,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-primary-color text-primary-color': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {handleTextLanguage(tab.name)}
    </Link>
  ))
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases(status as PurchaseListStatus)
  })
  let currentStatus: keyof (typeof resources)['vi']['translation']
  purchaseTabs.forEach((item) => {
    if (item.status === 1) {
      currentStatus = item.name
    }
  })

  const purchasesInCart = purchasesInCartData?.data.data
  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          <div>
            {purchasesInCart?.map((purchase) => (
              <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  to={`${pathRoute.home}products/${generateNameId({
                    name: purchase.product.name,
                    id: purchase.product._id
                  })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0'>
                    <img className='h-20 w-20 object-cover' src={purchase.product.image} alt={purchase.product.name} />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>x{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      ₫{formatCurrentcy(purchase.product.price_before_discount)}
                    </span>
                    <span className='ml-2 truncate text-primary-color'>₫{formatCurrentcy(purchase.product.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end items-center'>
                  <div>
                    <span>{handleTextLanguage('TotalMoney')}</span>
                    <span className='ml-4 text-xl text-primary-color'>
                      ₫{formatCurrentcy(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                  <div className='ml-4'>({handleTextLanguage(currentStatus)})</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
