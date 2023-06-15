<template>
  <a-tag :color="props.color">{{ props.title }}</a-tag>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  amount: Number,
  icon: String,
  color: String,
});
</script>

<style lang="scss" scoped></style>
