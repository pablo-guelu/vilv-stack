<template>
    <AddFieldFrame :title="'Text Area'" :addAction="addTextAreaField" />
</template>

<script setup lang="ts">
import AddFieldFrame from '@/Components/AddFieldFrame.vue';
import { FieldType } from '@/enums';
import { useBugFormStore } from '@/Stores/bugForm';

const bugFormStore = useBugFormStore();
const addTextAreaField = () => bugFormStore.openSideEditor(FieldType.TEXT_AREA);

</script>