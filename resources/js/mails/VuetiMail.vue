<template>

    <div>
        <h1>VuetiMail</h1>
    </div>

    <div v-for="item in data">
        <p>{{ item }}</p>
    </div>

</template>

<script lang="ts" setup>

const props = defineProps<{
    data: any
}>()

</script>
