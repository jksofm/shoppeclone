import { responsePurchase, PurchaseListStatus, Purchase } from 'src/models/product/purchase.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<responsePurchase<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(status: PurchaseListStatus) {
    return http.get<responsePurchase<Purchase[]>>(`${URL}`, {
      params: {
        status
      }
    })
  },
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<responsePurchase<Purchase[]>>(`${URL}/buy-products`, body)
  },
  updatePurchaseInCart(body: { product_id: string; buy_count: number }) {
    return http.put<responsePurchase<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePurchaseInCart(body: string[]) {
    return http.delete<responsePurchase<{ deleted_count: number }>>(`${URL}`, {
      data: body
    })
  }
}
export default purchaseApi
