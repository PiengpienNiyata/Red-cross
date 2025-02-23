<template>
    <div class="container-fluid">
        <div class="email-wrap user-main-wrapper">
            <div class="row">
                <!-- <LetterBoxSidebar /> -->
                <div class="col-xxl-12 col-xl-8 box-col-12">
                    <div class="users-box">
                        <UserBoxHeader v-if="!isFormPage" />
                        <router-view />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineAsyncComponent,computed } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();
// const LetterBoxSidebar = defineAsyncComponent(() => import("@/components/theme/letterbox/LetterBoxSidebar.vue"))
const UserBoxHeader = defineAsyncComponent(() => import("@/components/admins/users/userbox/UserBoxHeader.vue"))
const isFormPage = computed(() => 
  route.path.includes('/admins/users/create') || route.path.includes('/admins/users/edit')
);


</script>