import { useEffect } from 'react'
import useRouteElement from './hooks/useRouteElement'
import { LocalStorageEventTarget } from './utils/common'
import { AppProvider, useAppContext } from './contexts/app.context'
import './i18n/i18n'
import ErrorBoundary from './components/ErrorBoundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const routeElements = useRouteElement()
  const { reset } = useAppContext()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0
      }
    }
  })
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)

    return () => {
      LocalStorageEventTarget.removeEventListener('clearLs', reset)
    }
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ErrorBoundary>{routeElements}</ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </AppProvider>
    </QueryClientProvider>
  )
}

export default App
