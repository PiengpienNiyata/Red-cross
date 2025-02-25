<template>
  <div class="projects-search d-flex-align-items-center">
    <input
      class="form-control"
      type="text"
      v-model="localQuery"
      placeholder="Search..."
      @input="updateSearch"
    />
    <i class="fa fa-search"></i>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

// Props: Initial search value (optional)
const props = defineProps<{ modelValue?: string }>();
const emit = defineEmits<["update:modelValue"]>();

const localQuery = ref<string>(props.modelValue ?? "");

// Emit changes when localQuery updates
const updateSearch = () => {
  emit("update:modelValue", localQuery.value);
};

// Keep localQuery in sync if parent updates the value
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== localQuery.value) localQuery.value = newVal ?? "";
  }
);
</script>
