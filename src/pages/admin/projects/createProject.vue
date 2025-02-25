<template>
    <div class="container-fluid">
        <div class="row">
            <CreateProjectForm />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'
const CreateProjectForm = defineAsyncComponent(() => import("@/components/admins/projects/projectConfig/CreateProjectForm.vue"))
</script>