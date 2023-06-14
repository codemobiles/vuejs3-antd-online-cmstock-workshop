<template>
  <a-table :dataSource="stockStore.stocks" :columns="columns" />
</template>
<script lang="ts">
import { useStockStore } from "@/stores/useStockStore";
export default {
  setup() {
    const columns = [
      {
        title: "Image",
        dataIndex: "image",
      },
      {
        name: "Name",
        dataIndex: "name",
        width: "30%",
      },
      {
        title: "Price",
        dataIndex: "price",
      },
      {
        title: "Stock",
        dataIndex: "stock",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
      },
      {
        title: "Updated At",
        dataIndex: "updatedAt",
      },
      {
        title: "Action",
        dataIndex: "action",
      },
    ];

    const stockStore = useStockStore();
    stockStore.loadProducts();

    return {
      stockStore,
      columns,
    };
  },
};
</script>
