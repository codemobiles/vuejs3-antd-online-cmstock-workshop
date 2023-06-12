import { FetchingStatus } from "@/models/fetchingStatus.enum";
import { Product } from "@/models/product.model";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

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
