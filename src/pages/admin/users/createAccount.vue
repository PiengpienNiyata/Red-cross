<template>
    <div class="container-fluid">
        <div class="row">
            <CreateAccountForm />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'
const CreateAccountForm = defineAsyncComponent(() => import("@/components/admins/users/add_user/CreateAccountForm.vue"))
</script>