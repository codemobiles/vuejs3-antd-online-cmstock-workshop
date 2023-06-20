import { FetchingStatus } from "@/models/fetchingStatus.enum";
import { Product } from "@/models/product.model";
import { server } from "@/services/constants";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import httpClient from "@/services/httpClient";
import api from "@/services/api";

export const useStockStore = defineStore("stock", () => {
  const autocompleteOptions = ref<string[]>([]);
  const stocks = ref<Product[]>([]);
  const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);

  const loadProducts = async () => {
    setLoading(FetchingStatus.fetching);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const res = await api.getProducts();
      stocks.value = res.data;
    } catch (error) {
      setLoading(FetchingStatus.failed);
      return [];
    } finally {
      setLoading(FetchingStatus.success);
    }
  };

  const setLoading = (value: FetchingStatus) => {
    fetchingStatus.value = value;
  };

  const isLoading = () => {
    return fetchingStatus.value == FetchingStatus.fetching;
  };

  const getProductImage = (image: string) => {
    return "http://localhost:8081/images/" + image;
  };

  const onConfirmDelete = (id: string) => {
    alert("ok");
  };

  const search = async (value: string) => {
    debugger;
    if (value) {
      const result = await api.getProductByKeyword(value);
      stocks.value = result.data;
      autocompleteOptions.value = result.data.map((product: any) => ({
        value: product.name,
      }));
    } else {
      await loadProducts();
    }
  };

  return {
    search,
    loadProducts,
    fetchingStatus,
    // getColorTagByStock,
    // setLoading,
    getProductImage,
    isLoading,
    stocks,
    // onSelect,
    // debouncedSearch,
    onConfirmDelete,
    autocompleteOptions,
  };
});
