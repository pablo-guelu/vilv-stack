<template>
    <div class="d-flex align-center w-100 my-2">
        <div class="text-h5 me-1">{{name}}</div>
        <v-icon v-if="info" icon="mdi-information-outline" class="text-disabled"></v-icon>
        <div v-if="required" class="ms-auto align-self-end text-subtitle-1 text-disabled font-italic">(required)</div>
    </div>
    
</template>

<script lang="ts" setup>
const props = defineProps<{
    name: string
    required?: boolean
    info?: string
}>()
</script>

<style scoped>
</style>