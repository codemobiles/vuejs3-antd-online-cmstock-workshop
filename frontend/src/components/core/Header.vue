<template>
  <a-layout-header style="background: #fff; padding: 0">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="toggleCollapsed"
    />
    <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
  </a-layout-header>
</template>

<script lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";

export default {
  name: "Header",
  props: ["collapsed"],
  emits: ["update:collapsed"],
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup(props, { emit }) {
    const toggleCollapsed = () => {
      emit("update:collapsed", !props.collapsed);
    };

    return { toggleCollapsed };
  },
};
</script>

<style></style>
