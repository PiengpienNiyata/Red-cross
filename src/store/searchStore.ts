// stores/searchStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore("searchStore", () => {
  const query = ref<string>("");

  const setQuery = (newQuery: string) => {
    query.value = newQuery;
  };

  return { query, setQuery };
});
