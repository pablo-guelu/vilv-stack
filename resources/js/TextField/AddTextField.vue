<template>
    <AddFieldFrame :title="'Add Text Field'" :addAction="addTextField">

    </AddFieldFrame>
</template>

<script setup lang="ts">
import AddFieldFrame from '@/Components/AddFieldFrame.vue';
import { useAddField } from '@/Composables/addField';
import { FieldType } from '@/enums';

const addTextField = () => useAddField(FieldType.TEXT);

</script>