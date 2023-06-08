import type { User } from '@/models/user.model'
import httpClient from '@/services/httpClient'
import { server } from '@/services/constants'
import router from '@/router'
import type { Product } from '@/models/product.model'
const getProducts = async () => {
  let result = await httpClient.get(server.PRODUCT_URL)
  if (result.status == 200) {
    return result.data
  }
  return []
}

export const getProductById = (id: string) => {
  return httpClient.get(server.PRODUCT_URL + `/id/${id}`)
}

const addProduct = async (data: FormData) => {
  return await httpClient.post(server.PRODUCT_URL, data)
}

// in data have id
const updateProduct = async (data: Product) => {
  return await httpClient.post(server.PRODUCT_URL, data)
}
const deleteProduct = async (id: string) => {
  return await httpClient.post(`${server.PRODUCT_URL}/id/${id}`)
}

export default {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getProductById
}
