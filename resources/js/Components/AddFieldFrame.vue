<template>
    <div class="w-100 pa-2">
        <v-btn :color="color" append-icon="mdi-plus" :text="title" variant="outlined" class="text-none" size="x-large"
        density="compact" @click="addAction"></v-btn>
    </div>
</template>

<script lang="ts" setup>

import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
const bugFormStore = useBugFormStore();
const { editFieldMode } = storeToRefs(bugFormStore);

editFieldMode.value = false;

const props = withDefaults(defineProps<{
    title: string
    color?: string
    addAction: () => void
}>(), {
    title: '',
    color: 'primary',
    addAction: () => {}
})
</script>