<template>
  <a-table :dataSource="dataSource" :columns="columns" />
</template>
<script>
import { useStockStore } from "@/stores/useStockStore";
export default {
  setup() {

    const columns = [
      {
        title: 'Image',
        dataIndex: 'image'
      },
      {
        name: 'Name',
        dataIndex: 'name',
        width: '30%'
      },
      {
        title: 'Price',
        dataIndex: 'price'
      },
      {
        title: 'Stock',
        dataIndex: 'stock'
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt'
      },
      {
        title: 'Updated At',
        dataIndex: 'updatedAt'
      },
      {
        title: 'Action',
        dataIndex: 'action'
      }
    ]
    
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
