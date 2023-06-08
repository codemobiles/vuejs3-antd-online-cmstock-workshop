<template>
  <a-row justify="space-around" align="center">
    <a-col :span="12" :lg="6" v-for="(item, i) in stockCardList" :key="i">
      <StockCard :title="item.title" :amount="item.amount" :color="item.color" :icon="item.icon">
      </StockCard>
    </a-col>
    <a-col col :span="24" class="tw-mt-4">
      <a-row justify="end" class="tw-mb-4">
        <a-button type="primary" @click="$router.push('/stock-create')"> NEW PRODUCT </a-button>
      </a-row>

      <a-table :columns="columns" :data-source="stocks" v-if="!isLoading" :scroll="{ y: 500 }">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span> Name </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.key === 'image'">
            <v-img
              :src="record.image"
              lazy-src="https://picsum.photos/id/11/10/6"
              aspect-ratio="1"
              class="grey lighten-2"
              max-width="50"
              max-height="50"
            ></v-img>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a-button class="tw-text-[#ffd155ff]"> <EditFilled /></a-button>
              <a-button type="danger"> <DeleteFilled /></a-button>
            </span>
          </template>
        </template>
      </a-table>
      <a-skeleton v-else active avatar> </a-skeleton>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import StockCard from '@/components/cards/StockCard.vue'
import api from '@/services/api'
import { server } from '@/services/constants'
import { PlusCircleFilled, EditFilled, DeleteFilled } from '@ant-design/icons-vue'
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'

interface StockCardInterface {
  title: string
  amount: number
  icon: string
  color: string
}

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
let stocks = reactive<Array<any>>([])
onMounted(async () => {
  try {
    stocks = await api.getProducts()
  } finally {
    isLoading.value = false
  }
})
</script>
