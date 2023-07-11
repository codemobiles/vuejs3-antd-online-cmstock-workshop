<template>
  <a-layout-content
    class="tw-h-full tw-w-full tw-flex tw-justify-center tw-p-4"
    :class="isAuthenPage"
  >
    <RouterView />
  </a-layout-content>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Content",
  setup() {
    const route = useRoute();
    const isAuthenPage = computed(() => {
      const res = ["/login", "/register"].includes(route.path);
      if (res) return "tw-items-center";
      return "";
    });
    return { isAuthenPage };
  },
});
</script>

<style></style>
