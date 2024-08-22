<template>
    <AddFieldFrame :title="'Text Field'" :addAction="addTextField" />
</template>

<script setup lang="ts">
import AddFieldFrame from '@/Components/AddFieldFrame.vue';
import { FieldType } from '@/enums';
import { useBugFormStore } from '@/Stores/bugForm';

const bugFormStore = useBugFormStore();
const addTextField = () => bugFormStore.openSideEditor(FieldType.TEXT);

</script>