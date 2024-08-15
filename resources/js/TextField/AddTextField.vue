<template>
    <AddFieldFrame :title="'Add Text Field'" :addAction="addTextField">

    </AddFieldFrame>
</template>

<script setup lang="ts">
import AddFieldFrame from '@/Components/AddFieldFrame.vue';
import FieldType from '@/Components/FieldType.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { TextField } from '@/types';
import { storeToRefs } from 'pinia';
import { Ref, ref } from 'vue';

const bugFormStore = useBugFormStore();
const { addFieldDialog, addFieldDialogType } = storeToRefs(bugFormStore);

const addTextField = () => {
    addFieldDialogType.value = FieldType.TEXT;
    addFieldDialog.value = true
}

</script>