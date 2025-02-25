<template>
    <Card4 colClass="col-xxl-3 col-lg-4 col-sm-6 col-12" pre="true" preClass="f-m-light mt-1"
        headerTitle="true" :title=header>
        <h1 style="justify-self: flex-end;">{{ amount }}</h1>
    </Card4>
</template>
<script lang="ts" setup>
import { defineAsyncComponent, ref, defineProps } from 'vue'
const Card4 = defineAsyncComponent(() => import("@/components/common/card/CardData4.vue"))
let props = defineProps({
    header: String,
    amount: Number,
    icon: String
})
</script>