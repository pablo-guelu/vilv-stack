<template>
    <div class="d-flex align-center w-100 my-2">
        <div class="text-h5 me-1">{{name}}</div>
        <v-btn v-if="info" density="compact" icon="mdi-information-outline" class="text-disabled pa-0" flat/>
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