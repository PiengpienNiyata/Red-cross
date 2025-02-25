<template>
  <div class="container-fluid" style="margin-top: 25px">
    <div class="row">
      <Item header="Total project" :amount="totalProjects" />
      <Item header="Passed" :amount="passedProjects" />
      <Item header="Waiting" :amount="waitingProjects" />
      <Item header="Completed" :amount="completedProjects" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, computed } from "vue";
import { mockProjects } from "@/core/mockup/project";

const Item = defineAsyncComponent(
  () => import("@/components/admins/projects/projectStatusBar/StatusItem.vue")
);

const getProjectCount = (status?: string): number => {
  return status
    ? mockProjects.filter((project) => project.status === status).length
    : mockProjects.length;
};

const totalProjects = computed(() => getProjectCount());
const passedProjects = computed(() => getProjectCount("pass"));
const waitingProjects = computed(() => getProjectCount("waiting"));
const completedProjects = computed(() => getProjectCount("completed"));
</script>
