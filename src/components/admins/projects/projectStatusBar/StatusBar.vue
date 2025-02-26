<template>
  <div class="container-fluid" style="margin-top: 25px">
    <div class="row">
      <Item header="Total project" :amount="totalProjects" iconPath="blue"/>
      <Item header="Passed" :amount="passedProjects" iconPath="green" />
      <Item header="Waiting" :amount="waitingProjects" iconPath="yellow" />
      <Item header="Completed" :amount="completedProjects" iconPath="gray" />
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
