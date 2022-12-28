import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStoreV2 = defineStore("counter_v2", {
  state: () => {
    const count = ref(10);
    return { count };
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
