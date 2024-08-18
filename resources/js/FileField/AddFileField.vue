<template>
    <AddFieldFrame :title="'Files Field'" :addAction="addFilesField" />
</template>

<script setup lang="ts">
import AddFieldFrame from '@/Components/AddFieldFrame.vue';
import { FieldType } from '@/enums';
import { useBugFormStore } from '@/Stores/bugForm';

const bugFormStore = useBugFormStore();
const addFilesField = () => bugFormStore.openAddFieldDialog(FieldType.FILES);

</script>