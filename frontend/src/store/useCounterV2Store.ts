import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounterV2Store = defineStore("counterV2", {
  state: () => {
    const count = ref(0);
    return { count };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
});
