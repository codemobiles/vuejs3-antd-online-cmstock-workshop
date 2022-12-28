import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(10);
  const name = ref("Eduardo");
  const doubleCount = computed(() => count.value * 2);
  
  function increment() {
    count.value++;
  }

  return { count, name, doubleCount, increment };
});
