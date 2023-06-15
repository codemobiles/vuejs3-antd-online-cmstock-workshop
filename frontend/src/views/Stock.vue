<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="stockStore.stocks"
      :pagination="{ position: ['topRight'] }"
    >
      <template #headerCell="{ column }">
        <span class="tw-font-bold"> {{ column.title }} </span>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <div class="tw-block tw-truncate tw-overflow-ellipsis">
            <a @click="routeToEdit(record.id)">
              {{ record.name }}
            </a>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'image'">
          <img
            :src="stockStore.getProductImage(record.image)"
            lazy-src="https://picsum.photos/id/11/10/6"
            aspect-ratio="1"
            class="tw-object-contain tw-cursor-pointer tw-transition-all hover:tw-scale-[1.1]"
            width="50"
            height="50"
          />
        </template>
        <template v-else-if="column.dataIndex === 'price'">
          <span>{{ filters.currency(record.price) }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'stock'">
          <a-tag>{{ record.stock }} pcs</a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'createdAt'">
          <span class="tw-text-gray-600">{{
            filters.formatDate(record.createdAt)
          }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'updatedAt'">
          <span class="tw-text-gray-600">{{ record.updatedAt }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-row align="center">
            <a-button
              class="tw-bg-[#ffd155ff] tw-border-[#ffd155ff] tw-text-white"
              @click="$router.push(`/stock-edit/${record.id}`)"
            >
              <EditFilled class="tw-pb-2" />
            </a-button>

            <a-popconfirm title="Are you sure？">
              <template #icon><QuestionCircleOutlined /></template>
              <a-button type="danger">
                <DeleteFilled class="tw-pb-2"
              /></a-button>
            </a-popconfirm>
          </a-row>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { useStockStore } from "@/stores/useStockStore";
import filters from "@/services/filters";
import { useRouter } from "vue-router";

export default {
  setup() {
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
      routeToEdit,
      stockStore,
      columns,
      filters,
    };
  },
};
</script>
