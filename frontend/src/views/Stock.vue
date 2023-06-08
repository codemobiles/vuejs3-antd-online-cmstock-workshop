<template>
  <a-row justify="space-around" align="center" :gutter="[20]">
    <a-col :span="12" :lg="6" v-for="(item, i) in stockCardList" :key="i" class="tw-mb-2">
      <StockCard :title="item.title" :amount="item.amount" :color="item.color" :icon="item.icon">
      </StockCard>
    </a-col>
    <a-col col :span="24" class="tw-mt-4">
      <a-row justify="end" class="tw-mb-4" :gutter="[10, 10]">
        <a-col :span="20">
          <a-input-search   placeholder="input search text" enter-button @search="onSearch"  />
        </a-col>
        <a-col :span="4">
          <a-button class="tw-w-full" type="primary" @click="$router.push('/stock-create')">
            <a-row justify="center" class="tw-items-center">
              <PlusCircleFilled class="tw-pr-2 tw-hidden lg:tw-block" /><span class="tw-pr-1"
                >NEW</span
              >
              <span class="tw-hidden lg:tw-block">PRODUCT</span>
            </a-row>
          </a-button>
        </a-col>
      </a-row>

      <a-card v-if="!isLoading" class="tw-rounded-md ">
        <a-table :columns="columns" :data-source="stocks" :scroll="{ y: 400, x: 600 }">
          <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
              <span class="tw-font-medium"> Name </span>
            </template>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <div class="tw-block tw-truncate tw-overflow-ellipsis">
                <a @click="$router.push(`/stock-edit/${record.id}`)">
                  {{ record.name }}
                </a>
              </div>
            </template>
            <template v-else-if="column.key === 'image'">
              <img
                :src="getProductImage(record.image)"
                lazy-src="https://picsum.photos/id/11/10/6"
                aspect-ratio="1"
                class="grey lighten-2"
                width="100"
                height="100"
              />
            </template>
            <template v-else-if="column.key === 'price'">
              <span>{{ filters.currency(record.price) }}</span>
            </template>
            <template v-else-if="column.key === 'stock'">
              <a-tag :color="getColorTagByStock(record.stock)"
                >{{ filters.thousand(record.stock) }} pcs</a-tag
              >
            </template>
            <template v-else-if="column.key === 'createdAt'">
              <span>{{ filters.formatDate(record.createdAt) }}</span>
            </template>
            <template v-else-if="column.key === 'updatedAt'">
              <span>{{ filters.formatDate(record.updatedAt) }}</span>
            </template>
            <template v-else-if="column.key === 'action'">
              <a-row align="center">
                <a-button
                  class="tw-bg-[#ffd155ff] tw-border-[#ffd155ff] tw-text-white"
                  @click="$router.push(`/stock-edit/${record.id}`)"
                >
                  <EditFilled class="tw-pb-2" />
                </a-button>

                <a-popconfirm title="Are you sure？" @confirm="onConfirmDelete(record.id)">
                  <template #icon><QuestionCircleOutlined /></template>
                  <a-button type="danger"> <DeleteFilled class="tw-pb-2" /></a-button>
                </a-popconfirm>
              </a-row>
            </template>
          </template> </a-table
      ></a-card>
      <a-skeleton v-else active avatar> </a-skeleton>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import StockCard from '@/components/cards/StockCard.vue'
import type { Product } from '@/models/product.model'
import api from '@/services/api'
import {
  PlusCircleFilled,
  EditFilled,
  DeleteFilled,
  QuestionCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import filters from '@/services/filters'

interface StockCardInterface {
  title: string
  amount: number
  icon: string
  color: string
}

export default defineComponent({
  components: {
    PlusCircleFilled,
    EditFilled,
    DeleteFilled,
    StockCard,
    QuestionCircleOutlined,
    DeleteOutlined
  },
  setup() {
    const stockCardList = reactive<StockCardInterface[]>([
      { title: 'Total', amount: 1800, icon: 'ShoppingCartOutlined', color: '#039C52' },
      { title: 'Sold-out', amount: 12, icon: 'ExperimentOutlined', color: '#F18F15' },
      { title: 'Return', amount: 2, icon: 'RollbackOutlined', color: '#D94231' },
      { title: 'Discount', amount: 101, icon: 'GiftOutlined', color: '#03B8EA' }
    ])
    const columns = [
      {
        name: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: 'Stock',
        key: 'stock',
        dataIndex: 'stock'
      },
      {
        title: 'Created At',
        key: 'createdAt',
        dataIndex: 'createdAt'
      },
      {
        title: 'Updated At',
        key: 'updatedAt',
        dataIndex: 'updatedAt'
      },
      {
        title: 'Action',
        key: 'action'
      }
    ]
    let isLoading = ref(true)
    let stocks = ref([])

    const setLoading = (value: boolean) => {
      isLoading.value = value
    }

    const getColorTagByStock = (stock: number) => {
      if (stock >= 20) {
        return 'success'
      } else if (stock >= 10) {
        return 'warning'
      }
      return 'error'
    }

    const onSearch = async (value: any) => {
      setLoading(true)
      try {
        if (value) {
          let result = await api.getProductByKeyword(value)
          stocks.value = result.data
        } else {
          loadProducts()
        }
      } finally {
        setLoading(false)
      }
    }

    const loadProducts = async () => {
      setLoading(true)
      let res = await api.getProducts()
      stocks.value = res.data // Assign value to stocks using .value property
      setLoading(false)
    }

    const getProductImage = (image: any) => {
      return filters.fullImageUrl(image)
    }
    const onConfirmDelete = async (id: any) => {
      await api.deleteProduct(id)
      loadProducts()
    }

    onMounted(() => {
      loadProducts()
    })

    return {
      stocks,
      columns,
      isLoading,
      stockCardList,
      onConfirmDelete,
      getProductImage,
      filters,
      onSearch,
      getColorTagByStock
    }
  }
})
</script>
