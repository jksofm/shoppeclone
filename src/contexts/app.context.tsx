/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { userInfo } from 'src/models/auth/user.types'
import { getAccessToken, getUserInfo } from 'src/utils/common'
import { resources } from 'src/i18n/i18n'

type key = keyof (typeof resources)['vi']['translation']

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  userInfo: userInfo
  setUser: React.Dispatch<React.SetStateAction<userInfo>>
  productsChoose: { product_id: string; buy_count: number; price: number; price_before: number; checked: boolean }[]
  setProductsChoose: React.Dispatch<
    React.SetStateAction<
      { product_id: string; buy_count: number; price: number; price_before: number; checked: boolean }[]
    >
  >
  reset: () => void
  isSideFilterOpen: boolean
  setSideFilter: React.Dispatch<React.SetStateAction<boolean>>
  handleLanguage: (lng: 'en' | 'vi') => void
  handleTextLanguage: (key: key) => string
}
const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessToken()),
  setIsAuthenticated: () => null,
  userInfo: getUserInfo(),
  setUser: () => null,
  productsChoose: [],
  setProductsChoose: () => null,
  reset: () => null,
  isSideFilterOpen: false,
  setSideFilter: () => null,
  handleLanguage: () => null,
  handleTextLanguage: () => ''
}
export const AppContext = React.createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(initialAppContext.isAuthenticated)
  const [userInfo, setUser] = React.useState<userInfo>(initialAppContext.userInfo)
  const [productsChoose, setProductsChoose] = React.useState<
    { product_id: string; buy_count: number; price: number; price_before: number; checked: boolean }[]
  >(initialAppContext.productsChoose)
  const [isSideFilterOpen, setSideFilter] = React.useState<boolean>(initialAppContext.isSideFilterOpen)
  const reset = () => {
    setIsAuthenticated(false)
    setProductsChoose([])
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
  const { i18n, t } = useTranslation()
  const handleLanguage = (lng: 'en' | 'vi') => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng)
    }
    // console.log(i18n.language)
  }
  const handleTextLanguage = (key: key) => {
    return t(key)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userInfo,
        setUser,
        productsChoose,
        setProductsChoose,
        reset,
        setSideFilter,
        isSideFilterOpen,
        handleLanguage,
        handleTextLanguage
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => {
  return React.useContext(AppContext)
}
