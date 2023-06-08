<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    class="tw-bg-[url('@/assets/bg-menu-2.png')] tw-bg-no-repeat tw-bg-[#213140] tw-bg-cover"
  >
    <div>
      <img src="@/assets/05-banner-vuejs.png" alt="logo" style="width: 100%" />
    </div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
      class="tw-bg-transparent"
    >
      <a-menu-item v-for="(item, i) in menuList" :key="i" @click="$router.push(item.to)">
        <DatabaseOutlined v-if="item.icon === 'DatabaseOutlined'" />
        <StockOutlined v-else />
        <span>{{ item.name }}</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
import { StockOutlined, DatabaseOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  components: {
    StockOutlined,
    DatabaseOutlined
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    return {
      menuList: reactive([
        { name: 'Stock', to: '/stock', icon: 'DatabaseOutlined' },
        { name: 'Report', to: '/report', icon: 'StockOutlined' }
      ]),
      selectedKeys: ref<string[]>(['1'])
    }
  }
})
</script>
