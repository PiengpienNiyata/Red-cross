<template>
    <div class="container-fluid">
        <div class="row">
            <AddUserForm />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'
const AddUserForm = defineAsyncComponent(() => import("@/components/admins/users/add_user/AddUserForm.vue"))
</script>