<template>
  <a-row justify="space-around" align="center">
    <a-col
      :span="12"
      :lg="6"
      v-for="(item, i) in stockCardList"
      :key="i"
      class="tw-mb-2 tw-px-2"
    >
      <StockCard :title="item.title" :color="item.color" />
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { useStockStore } from "@/stores/useStockStore";
import StockCard from "@/components/cards/StockCard.vue";
import filters from "@/services/filters";
import { useRouter } from "vue-router";

export default {
  components: { StockCard },
  setup() {
    const stockCardList = [
      {
        title: "Total",
        amount: 1800,
        icon: "ShoppingCartOutlined",
        color: "#039C52",
      },
      {
        title: "Sold-out",
        amount: 12,
        icon: "ExperimentOutlined",
        color: "#F18F15",
      },
      {
        title: "Return",
        amount: 2,
        icon: "RollbackOutlined",
        color: "#D94231",
      },
      {
        title: "Discount",
        amount: 101,
        icon: "GiftOutlined",
        color: "#03B8EA",
      },
    ];

    const columns = [
      {
        title: "Id",
        dataIndex: "id",
      },
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
    const router = useRouter();

    stockStore.loadProducts();

    const routeToEdit = (id: string) => {
      router.push(`/stock-edit/${id}`);
    };

    return {
      stockCardList,
      routeToEdit,
      stockStore,
      columns,
      filters,
    };
  },
};
</script>
