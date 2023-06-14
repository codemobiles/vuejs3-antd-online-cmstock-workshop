import { FetchingStatus } from "@/models/fetchingStatus.enum";
import { Product } from "@/models/product.model";
import { server } from "@/services/constants";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axios from "axios";

const dummyData: Product[] = [
  {
    name: "Product1",
    stock: 99,
    price: 100,
  },
  {
    name: "Product2",
    stock: 99,
    price: 100,
  },
  {
    name: "Product3",
    stock: 99,
    price: 100,
  },
];

export const useStockStore = defineStore("stock", () => {
  const autocompleteOptions = ref([]);
  const stocks = ref<Product[]>(dummyData);
  const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);

  const getProducts = () => {
    return axios.get("http://localhost:8081/api/v2/" + server.PRODUCT_URL);
  };

  return {
    // loadProducts,
    fetchingStatus,
    // getColorTagByStock,
    // setLoading,
    // getProductImage,
    // isLoading,
    stocks,
    // onSelect,
    // debouncedSearch,
    // onConfirmDelete,
    autocompleteOptions,
  };
});
