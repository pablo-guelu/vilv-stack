<template>
    <div class="d-flex align-center w-100 mb-4">
        <div class="text-h5 me-1">{{ name }}</div>
    </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
    name: string
}>()

const showInfo = ref(false)
</script>

<style scoped></style>