import { useSearchParams } from 'react-router-dom'
import { ProductListConfig } from 'src/models/product/product.type'
export default function useQueryParams(): ProductListConfig {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}
