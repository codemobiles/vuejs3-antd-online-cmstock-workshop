<template>
  <div>{{ props.title }}</div>
</template>

<script lang="ts">
export default {
  props: ["title"],
  setup(props) {
    return { props };
  },
};
</script>

<style lang="scss" scoped></style>
