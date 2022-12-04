<template>
  <div>
    <h1>CodeMobiles: {{ tmp }}</h1>
    <button @click="clickMe">Click Me</button>
    <a-button type="primary">Primary Button</a-button>
    <a-button>Default Button</a-button>
    <a-button type="dashed">Dashed Button</a-button>
    <a-button type="text">Text Button</a-button>
    <a-button type="link">Link Button</a-button>
    <a-button type="primary">
      <template #icon><SearchOutlined /></template>
      Search
    </a-button>
  </div>
</template>

<script lang="ts">
import SearchOutlined from "@ant-design/icons-vue/SearchOutlined";
export default {
  components: { SearchOutlined },
  setup: () => {
    const tmp = "Lek";

    const clickMe = () => {
      alert("Hey");
    };

    return { tmp, clickMe };
  },
};
</script>

<style></style>
