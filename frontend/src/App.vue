<template>
  <a-layout class="tw-min-h-screen">
    <Sidebar
      v-model:collapsed="collapsed"
      v-if="!['/login', '/register'].includes($route.path)"
    ></Sidebar>
    <a-layout>
      <Header
        v-model:collapsed="collapsed"
        v-if="!['/login', '/register'].includes($route.path)"
      ></Header>
      <Content></Content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Header from '@/components/core/Header.vue'
import Content from '@/components/core/Content.vue'
import Sidebar from '@/components/core/Sidebar.vue'
export default defineComponent({
  components: {
    Header,
    Content,
    Sidebar
  },
  setup() {
    return {
      selectedKeys: ref<string[]>(['1']),
      collapsed: ref<boolean>(false)
    }
  }
})
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
