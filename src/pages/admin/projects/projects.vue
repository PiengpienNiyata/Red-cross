<template>
  <div class="container-fluid">
    <div class="email-wrap project-main-wrapper">

      

      <div class="row">
        <!-- <LetterBoxSidebar /> -->
        <div class="col-xxl-12 col-xl-8 box-col-12">
          <div class="projects-box">
            <ProjectListHeader />
            <!-- v-if="!isFormPage" -->
            
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineAsyncComponent, computed, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
// const LetterBoxSidebar = defineAsyncComponent(() => import("@/components/theme/letterbox/LetterBoxSidebar.vue"))
const ProjectListHeader = defineAsyncComponent(
  () => import("@/components/admins/projects/projectList/ProjectListHeader.vue")
);
// const isFormPage = computed(() =>
//   route.path.includes('/admins/users/create') || route.path.includes('/admins/users/edit')
// );


</script>
