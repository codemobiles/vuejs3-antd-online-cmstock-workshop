<template>
  <div>
    <a-table :dataSource="stockStore.stocks" :columns="columns">
      <!-- Header -->
      <template #headerCell="{ column }">
        <!-- Image col -->
        <template v-if="column.dataIndex === 'image'">
          <span class="tw-font-bold"> Image </span>
        </template>

        <!-- Name col -->
        <template v-if="column.dataIndex === 'name'">
          <span class="tw-font-bold"> Name </span>
        </template>

        <!-- Price col -->
        <template v-if="column.dataIndex === 'price'">
          <span class="tw-font-bold"> Price </span>
        </template>
      </template>

      <!-- Cells -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'image'">
          <img            
            :src="stockStore.getProductImage(record.image)"
            lazy-src="https://picsum.photos/id/11/10/6"
            aspect-ratio="1"
            class="tw-object-contain tw-cursor-pointer tw-transition-all hover:tw-scale-[1.1]"
            width="50"
            height="50"
          />
        </template>
      </template>
    </a-table>
  </div>
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
