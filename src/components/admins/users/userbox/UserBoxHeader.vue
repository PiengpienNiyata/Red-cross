<template>
  <div class="card users-body users-list" :class="active ? 'hide' : ''">
    <div class="users-header-wrapper">
      <div class="user-list-title">User list</div>
      <div class="users-body">
        <div class="users-search d-flex-align-items-center">
          <input
            class="form-control"
            type="text"
            v-model="searchQuery"
            placeholder="Search..."
          />
          <i class="fa fa-search"></i>
        
        </div>
        <router-link to="/admins/users/create">
          <button class="btn btn-danger" style="height: 100%;">
            <i class="fa fa-plus"></i> Add user
          </button>
        </router-link>

        <ul class="dropdown-menu dropdown-block dropdown-menu-end">
          <li v-for="(item, index) in dropdown" :key="index">
            <a class="dropdown-item" href="#!">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="user-tab-content" id="email-pills-tabContent">
      <UserItem :search-query="searchQuery" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { dropdown } from "@/core/data/letter-box";
import { defineAsyncComponent } from "vue";
const UserItem = defineAsyncComponent(
  () => import("@/components/admins/users/userbox/UserItem.vue")
);

const searchQuery = ref<string>("");
let active = ref<boolean>(false);
</script>
