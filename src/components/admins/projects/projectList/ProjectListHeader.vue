<template>
  <div class="card projects-body projects-list" :class="active ? 'hide' : ''">
    <div
      class="projects-header-wrapper d-flex align-items-center justify-content-between"
    >
      <div class="project-list-title"><h1>Overall</h1></div>

      <div class="projects-body d-flex align-items-center">
        <div class="projects-search flex-grow-1 mx-3">
          <input
            class="form-control h-100"
            type="text"
            v-model="localQuery"
            placeholder="Search..."
            @input="updateSearch"
            style="height: 90%"
          />
          <i class="fa fa-search"></i>
        </div>

        <router-link to="/admins/projects/create">
          <button class="btn btn-danger h-100" style="height: 100%">
            <i class="fa fa-plus"></i> Add project
          </button>
        </router-link>
      </div>

      
    </div>
    <div class="container-fluid" style="margin-top: 25px;">
        <div class="row">
          <StatusBar />
        </div>
    </div>
    <div class="project-tab-content" id="email-pills-tabContent">
      <ProjectItem :search-query="searchQuery" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { defineAsyncComponent } from "vue";
import { useSearchStore } from "@/store/searchStore";

const StatusBar = defineAsyncComponent(() => import("@/components/admins/projects/projectStatusBar/StatusBar.vue"))

const ProjectItem = defineAsyncComponent(
  () => import("@/components/admins/projects/projectList/ProjectItem.vue")
);

const searchQuery = ref<string>("");
let active = ref<boolean>(false);

const searchStore = useSearchStore();
const localQuery = ref(searchStore.query);

const updateSearch = () => {
  searchStore.setQuery(localQuery.value);
};
</script>
