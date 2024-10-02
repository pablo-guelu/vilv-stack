<template>
    <v-textarea v-model="field.result!.function" variant="outlined" density="compact" label="Result Function" placeholder="() => { }" hint="This function will update the result when the form values (names) are updated." persistent-hint />
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const bugFormStore = useBugFormStore();
const { formStructure, currentRowIndex, currentColumnIndex } = storeToRefs(bugFormStore);

const field = computed(() => {
    return formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field!
});
</script>