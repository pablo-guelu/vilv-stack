<template>
    <div class="d-flex flex-wrap">
        <v-number-input :reverse="false" controlVariant="stacked" inset label="height" variant="outlined" density="compact"
            v-model="field!.customStyle!.height" class="w-50 pe-4 mb-2" :min="250" />
        <v-number-input :reverse="false" controlVariant="stacked" inset label="width" variant="outlined" density="compact"
            v-model="field!.customStyle!.width" class="w-50 pe-4 mb-2" />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
const bugFormStore = useBugFormStore()

const { formStructure, currentRowIndex, currentColumnIndex } = storeToRefs(bugFormStore)

const field = computed(() => formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field)
</script>
