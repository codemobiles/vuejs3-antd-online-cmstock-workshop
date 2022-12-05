<template>
  <a-layout-sider
    :collapsed="collapsed"
    :trigger="null"
    collapsible
    style="
      background: url(src/assets/bg-menu-2.png);
      background-color: #213140 !important;
      background-repeat: no-repeat;
      background-size: cover;
    "
  >
    <img
      @click="toggleCollapsed"
      src="@/assets/05-banner-vuejs.png"
      alt=""
      style="width: 100%"
    />
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
      style="background-color: transparent"
    >
      <a-menu-item key="1" @click="router.push('/stock')">
        <CodepenOutlined />
        <span>Stock</span>
      </a-menu-item>
      <a-menu-item key="2" @click="$router.push('/report')">
        <LineChartOutlined />
        <span>Report</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { ref } from "vue";
import * as Icons from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
export default {
  name: "Menu",
  props: ["collapsed"],
  emits: ["update:collapsed"],
  components: {
    ...Icons,
  },
  setup(props, { emit }) {
    const selectedKeys = ref<string[]>(["2"]);
    const router = useRouter();

    const toggleCollapsed = () => {
      emit("update:collapsed", !props.collapsed);
    };

    return { selectedKeys, toggleCollapsed, router };
  },
};
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

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
