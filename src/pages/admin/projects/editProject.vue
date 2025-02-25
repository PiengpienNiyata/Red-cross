<template>
    <div class="container-fluid">
        <div class="row">
            <EditProjectForm v-if="userId" :userId="userId" />
            <div v-else>
        <p>User ID not provided. Redirecting to user list...</p>
      </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent, onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router";

const EditProjectForm = defineAsyncComponent(() => import("@/components/admins/projects/projectConfig/EditProjectForm.vue"))

const router = useRouter();
const route = useRoute();
const userId = route.params.userId as string | undefined;

onMounted(() => {
  if (!userId) {
    setTimeout(() => {
      router.push({ name: "users" });
    }, 1500);
  }
});
</script>