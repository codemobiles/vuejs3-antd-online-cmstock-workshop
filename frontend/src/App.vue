<template>
  <a-layout class="h-screen">
    <Menu v-model:collapsed="collapsed" v-if="authStore.session.isLoggedIn" />
    <a-layout>
      <Header
        v-model:collapsed="collapsed"
        v-if="authStore.session.isLoggedIn"
      />
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <Content />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
// import Menu from "./components/core/Menu.vue";
import Menu from "@/components/core/Menu.vue";
import Header from "./components/core/Header.vue";
import Content from "./components/core/Content.vue";
import { defineComponent, ref } from "vue";
import { useAuthStore } from "@/store/useAuthStore";

export default defineComponent({
  components: {
    Menu,
    Header,
    Content,
  },
  setup() {
    const authStore = useAuthStore();
    authStore.restoreSession();
    
    return {
      selectedKeys: ref<string[]>(["2"]),
      collapsed: ref<boolean>(false),
      authStore,
    };
  },
});
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

.site-layout .site-layout-background {
  background: #fff;
}
</style>
