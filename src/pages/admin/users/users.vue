<template>
    <div class="container-fluid">
        <div class="email-wrap email-main-wrapper">
            <div class="row">
                <!-- <LetterBoxSidebar /> -->
                <div class="col-xxl-12 col-xl-8 box-col-12">
                    <div class="email-right-aside">
                        <UserBoxHeader />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
// const LetterBoxSidebar = defineAsyncComponent(() => import("@/components/theme/letterbox/LetterBoxSidebar.vue"))
const UserBoxHeader = defineAsyncComponent(() => import("@/components/admins/users/userbox/UserBoxHeader.vue"))
</script>