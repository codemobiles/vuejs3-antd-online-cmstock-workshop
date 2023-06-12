<template>
  <a-table :dataSource="dataSource" :columns="columns" />
</template>
<script>
import { useStockStore } from "@/stores/useStockStore";
export default {
  setup() {
    const stockStore = useStockStore();
    const dataSource = stockStore.stocks;

    return {
      dataSource,
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Stock",
          dataIndex: "stock",
          key: "stock",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
        },
      ],
    };
  },
};
</script>
