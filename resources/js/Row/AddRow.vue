<template>
    <AddFieldFrame :color="'success'" :title="`Row ${colsNumber}-Column${colsNumber > 1 ? 's' : ''}`" :addAction="() => addRow(colsNumber)" />
</template>

<script lang="ts" setup>
import AddFieldFrame from '@/Components/AddFieldFrame.vue';
import { useBugFormStore } from '@/Stores/bugForm';

const props = defineProps<{
    colsNumber: number
}>();

const bugFormStore = useBugFormStore();
const { addRow } = bugFormStore;

</script>