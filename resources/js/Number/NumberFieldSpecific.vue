<template>
    <div class="d-flex flex-column flex-md-row justify-space-between">
        <v-number-input v-model="field!.number!.min" label="Min" variant="outlined" density="compact" control-variant="stacked" class="ma-2" />
        <v-number-input v-model="field!.number!.max" label="Max" variant="outlined" density="compact" control-variant="stacked" class="ma-2" />
        <v-number-input v-model="field!.number!.step" label="Step" variant="outlined" density="compact" control-variant="stacked" class="ma-2" />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { formStructure, currentRowIndex, currentColumnIndex } = storeToRefs(bugFormStore);

const field = computed(() => formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field);
</script>