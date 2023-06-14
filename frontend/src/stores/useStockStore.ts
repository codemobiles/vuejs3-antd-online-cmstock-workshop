import { FetchingStatus } from "@/models/fetchingStatus.enum";
import { Product } from "@/models/product.model";
import { server } from "@/services/constants";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axios from "axios";

export const useStockStore = defineStore("stock", () => {
  const autocompleteOptions = ref([]);
  const stocks = ref<Product[]>([]);
  const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);

  const loadProducts = async () => {
    const result = await axios.get(
      "http://localhost:8081/api/v2/" + server.PRODUCT_URL
    );
    stocks.value = result.data;
  };

  return {
    loadProducts,
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
