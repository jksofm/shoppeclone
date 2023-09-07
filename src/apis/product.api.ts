import http from 'src/utils/http'
import {
  responseProductList,
  ProductListConfig,
  responseProductItem,
  responseCategory
} from '../models/product/product.type'

const URL = '/products'
const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<responseProductList>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<responseProductItem>(`${URL}/${id}`)
  },
  getProductCategory() {
    return http.get<responseCategory>(`/categories`)
  }
}
export default productApi
