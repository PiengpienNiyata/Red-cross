<template>
    <div class="container-fluid">
        <div class="row">
            <EditProjectForm v-if="projectId" :projectId="projectId" />
            <div v-else>
        <p>Project ID not provided. Redirecting to project list...</p>
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
const projectId = route.params.projectId as string | undefined;

onMounted(() => {
  if (!projectId) {
    setTimeout(() => {
      router.push({ name: "projects" });
    }, 1500);
  }
});
</script>