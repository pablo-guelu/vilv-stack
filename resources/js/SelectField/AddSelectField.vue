<template>
    <AddFieldFrame :title="'Select Field'" :addAction="addSelectField" />
</template>

<script setup lang="ts">
import AddFieldFrame from '@/Components/AddFieldFrame.vue';
import { FieldType } from '@/enums';
import { useBugFormStore } from '@/Stores/bugForm';

const bugFormStore = useBugFormStore();
const addSelectField = () => bugFormStore.openSideEditor(FieldType.SELECT);

</script>