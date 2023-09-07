import React, { lazy, Suspense } from 'react'
import { useRoutes, Outlet, Navigate } from 'react-router-dom'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
// import LoginPage from 'src/pages/Login'
// import ProductListPage from 'src/pages/ProductListPage'
// import RegisterPage from 'src/pages/Register'

import { useAppContext } from 'src/contexts/app.context'
import pathRoute from 'src/constants/path'
// import ProductDetailPage from 'src/pages/ProductDetailPage'
// import CartPage from 'src/pages/CartPage'
import UserLayout from 'src/pages/User/Layout'
// import Profile from 'src/pages/User/Pages/Profile'
import ChangePassword from 'src/pages/User/Pages/ChangePassword'
import ControlPurchase from 'src/pages/User/Pages/ControlPurchase'
import NotFoundPage from 'src/pages/NotFoundPage'

function ProtectedRoute() {
  const { isAuthenticated } = useAppContext()

  return isAuthenticated ? <Outlet /> : <Navigate to={pathRoute.login} />
}
function RejectedRoute() {
  const { isAuthenticated } = useAppContext()

  return !isAuthenticated ? <Outlet /> : <Navigate to={pathRoute.home} />
}
const Login = lazy(() => import('src/pages/Login'))
const Register = lazy(() => import('src/pages/Register'))
const ProductDetail = lazy(() => import('src/pages/ProductDetailPage'))
const ProductList = lazy(() => import('src/pages/ProductListPage'))
const Profile = lazy(() => import('src/pages/User/Pages/Profile'))
const Cart = lazy(() => import('src/pages/CartPage'))

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: pathRoute.home,
      index: true,
      element: (
        <MainLayout>
          {/* <ProductListPage /> */}
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: pathRoute.productDetail,
      index: true,
      element: (
        <MainLayout>
          {/* <ProductDetailPage /> */}
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: pathRoute.profile,
          element: (
            <MainLayout>
              <UserLayout>
                <Suspense>
                  <Profile />
                </Suspense>
              </UserLayout>
            </MainLayout>
          )
        },
        {
          path: pathRoute.changePassword,
          element: (
            <MainLayout>
              <UserLayout>
                <ChangePassword />
              </UserLayout>
            </MainLayout>
          )
        },
        {
          path: pathRoute.purchaseControl,
          element: (
            <MainLayout>
              <UserLayout>
                <ControlPurchase />
              </UserLayout>
            </MainLayout>
          )
        },
        {
          path: pathRoute.cart,
          element: (
            <MainLayout>
              <Suspense>
                <Cart />
              </Suspense>
              {/* <CartPage /> */}
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: pathRoute.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: pathRoute.register,
          element: (
            <RegisterLayout>
              {/* <RegisterPage /> */}
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFoundPage />
        </MainLayout>
      )
    }
  ])
  return routeElement
}
