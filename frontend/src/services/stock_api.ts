import httpClient from '@/services/httpClient'
import { server } from '@/services/constants'
import type { Product } from '@/models/product.model'


export const getProducts = () => {
  return httpClient.get(server.PRODUCT_URL);
};


export const getProductByKeyword = (keyword: any) => {
  return httpClient.get(server.PRODUCT_URL + `/name/${keyword}`);
};

export const getProductById = (id: any) => {
  return httpClient.get(server.PRODUCT_URL + `/id/${id}`)
}

export const addProduct = (data: FormData) => {
  return httpClient.post(server.PRODUCT_URL, data)
}

// in data have id
export const updateProduct = (data: any) => {
  return httpClient.put(server.PRODUCT_URL, data)
}
export const deleteProduct = (id: string) => {
  return httpClient.delete(`${server.PRODUCT_URL}/id/${id}`)
}


