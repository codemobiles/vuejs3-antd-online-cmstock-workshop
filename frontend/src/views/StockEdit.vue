<template>
  <div>Stock Edit {{ route.params.id }}</div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();

    return { route };
  },
};
</script>

<style lang="scss" scoped></style>
