<template>
  <a-layout-header class="tw-p-0 tw-bg-green-600 tw-text-white">
    <a-row justify="space-between" align="center" class="tw-mx-6">
      <a-row align="center" class="tw-items-center">
        <MenuUnfoldOutlined
          v-if="collapsed"
          class="trigger tw-text-xl tw-transition-all hover:tw-text-green-300"
          @click="toggleCollapsed"
        />
        <MenuFoldOutlined
          v-else
          class="trigger tw-text-xl tw-transition-all hover:tw-text-green-300"
          @click="toggleCollapsed"
        />
        <span class="tw-px-2 tw-font-bold tw-text-xl">CMStock</span>
      </a-row>
      <div>
        <a-button type="text" @click="authStore.logout">
          <a-row align="center" class="tw-items-center">
            <LogoutOutlined class="tw-text-white tw-pr-2" />
            <span class="tw-text-white"> Logout </span>
          </a-row>
        </a-button>
      </div>
    </a-row>
  </a-layout-header>
</template>

<script lang="ts">
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { useAuthStore } from "@/stores/useAuthStore";

export default {
  name: "Header",
  props: ["collapsed"],
  emits: ["update:collapsed"],
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
  },
  setup(props, { emit }) {
    const authStore = useAuthStore();

    const toggleCollapsed = () => {
      emit("update:collapsed", !props.collapsed);
    };

    return { toggleCollapsed, authStore };
  },
};
</script>

<style>
.trigger {
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
}
</style>
