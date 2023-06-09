<template>
  <a-row justify="space-around" align="center" :gutter="[20]">
    <a-col :span="12" :lg="6" v-for="(item, i) in stockCardList" :key="i" class="tw-mb-2">
      <StockCard :title="item.title" :amount="item.amount" :color="item.color" :icon="item.icon">
      </StockCard>
    </a-col>
    <a-col col :span="24" class="tw-mt-4">
      <a-row justify="end" class="tw-mb-4" :gutter="[10, 10]">
        <a-col :span="20">
          <a-auto-complete
            class="tw-w-full"
            v-model="searchValue"
            placeholder="Input search text"
            :options="autocompleteOptions"
            @search="debouncedSearch"
            @select="onSelect"
            :default-active-first-option="false"
            :filter-option="false"
            :loading="isLoading"
          />
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

      <a-card v-if="!isLoading" class="tw-rounded-md">
        <a-table :columns="columns" :data-source="stocks" :scroll="{ y: 700, x: 600 }">
          <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
              <span class="tw-font-medium"> Name </span>
            </template>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <div class="tw-block tw-truncate tw-overflow-ellipsis">
                <a @click="routeToEdit(record.id)">
                  {{ record.name }}
                </a>
              </div>
            </template>
            <template v-else-if="column.key === 'image'">
              <img
                @click="routeToEdit(record.id)"
                :src="getProductImage(record.image)"
                lazy-src="https://picsum.photos/id/11/10/6"
                aspect-ratio="1"
                class="tw-cursor-pointer tw-transition-all hover:tw-scale-[1.1]"
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
              <span class="tw-text-gray-600">{{ filters.formatTime(record.createdAt) }}</span>
            </template>
            <template v-else-if="column.key === 'updatedAt'">
              <span class="tw-text-gray-600">{{ filters.formatTime(record.updatedAt) }}</span>
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
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import filters from '@/services/filters'
import { useRouter } from 'vue-router'
// @ts-ignore
import { debounce } from 'lodash'

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
    const router = useRouter()

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
    let searchValue = ref('')
    const autocompleteOptions = ref([])

    const setLoading = (value: boolean) => {
      isLoading.value = value
    }

    const routeToEdit = (id: string) => {
      router.push(`/stock-edit/${id}`)
    }

    const getColorTagByStock = (stock: number) => {
      if (stock >= 20) {
        return 'success'
      } else if (stock >= 10) {
        return 'warning'
      }
      return 'error'
    }

    const debouncedSearch = debounce(async (value: string) => {
      setLoading(true)
      try {
        if (value) {
          let result = await api.getProductByKeyword(value)
          stocks.value = result.data
          autocompleteOptions.value = result.data.map((product: any) => ({
            value: product.name
          }))
        } else {
          loadProducts()
        }
      } finally {
        setLoading(false)
      }
    }, 1000) // Adjust the debounce delay as needed

    const onSelect = async (value: any) => {
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

    watch(stocks, () => {
      // Update autocomplete options when stocks change
      autocompleteOptions.value = stocks.value.map((product: Product) => ({
        value: product.name
      })) as any
    })

    return {
      stocks,
      columns,
      isLoading,
      stockCardList,
      onConfirmDelete,
      getProductImage,
      filters,
      getColorTagByStock,
      routeToEdit,
      searchValue,
      autocompleteOptions,
      debouncedSearch,
      onSelect
    }
  }
})
</script>
