import { FetchingStatus } from "@/models/fetchingStatus.enum";
import { Product } from "@/models/product.model";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useStockStore = defineStore("stock", () => {
  const autocompleteOptions = ref([]);
  const stocks = ref<Product[]>([]);
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
