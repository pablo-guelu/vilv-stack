<template>
    <AddFieldFrame :color="'success'" :title="`${colsNumber}-Column${colsNumber > 1 ? 's' : ''} Row`" :addAction="() => addRow(colsNumber)" />
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