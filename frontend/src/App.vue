<template>
  <div>
    <h1>CodeMobiles: {{ tmp }}</h1>
    <button @click="clickMe">Click Me</button>
  </div>
</template>

<script lang="ts">
export default {
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
