import { FetchingStatus } from "@/models/fetchingStatus.enum";
import { Product } from "@/models/product.model";
import { server } from "@/services/constants";
import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";
import httpClient from "@/services/httpClient";
import api from "@/services/api";
import { debounce } from "lodash";

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

  const getColorTagByStock = (stock: number) => {
    if (stock >= 20) {
      return "success";
    } else if (stock >= 10) {
      return "warning";
    }
    return "error";
  };

  const createProduct = async (data: any) => {
    const formData = new FormData();
    const { name, price, stock, image } = data;

    formData.append("name", name);
    formData.append("stock", stock.toString());
    formData.append("price", price.toString());
    if (image) {
      formData.append("image", image!);
    }
    await api.addProduct(formData);
  };

  const editProduct = async (data: any) => {
    const formData = new FormData();
    const { name, price, stock, image, id } = data;
    formData.append("id", id);
    formData.append("name", name);
    formData.append("stock", stock.toString());
    formData.append("price", price.toString());
    if (image) {
      formData.append("image", image!);
    }
    await api.updateProduct(formData);
  };

  const getProductImage = (image: string) => {
    return "http://localhost:8081/images/" + image;
  };

  const onConfirmDelete = async (id: string) => {
    await api.deleteProduct(id);
    await loadProducts();
  };

  const searchWithDebounce = async (value: string) => {
    debouncedSearch(value);
  };

  const debouncedSearch = debounce(async (value: string) => search(value), 500); // Adjust the debounce delay as needed

  const search = async (value: string) => {
    try {
      if (value) {
        const result = await api.getProductByKeyword(value);
        stocks.value = result.data;
        autocompleteOptions.value = result.data.map((product: any) => ({
          value: product.name,
        }));
      } else {
        await loadProducts();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSelect = async (value: any) => {
    setLoading(FetchingStatus.fetching);
    try {
      if (value) {
        const result = await api.getProductByKeyword(value);
        stocks.value = result.data;
      } else {
        loadProducts();
      }
    } finally {
      setTimeout(() => {
        setLoading(FetchingStatus.success);
      }, 1000);
    }
  };

  watch(
    stocks,
    () => {
      // Update autocomplete options when stocks change
      autocompleteOptions.value = stocks.value.map((product: Product) => ({
        value: product.name,
      })) as any;
    },
    { deep: true }
  );

  return {
    search,
    searchWithDebounce,
    loadProducts,
    fetchingStatus,
    getColorTagByStock,
    createProduct,
    editProduct,
    getProductImage,
    isLoading,
    stocks,
    onSelect,
    onConfirmDelete,
    autocompleteOptions,
  };
});
