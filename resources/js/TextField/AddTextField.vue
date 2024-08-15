<template>
    <AddFieldFrame :title="'Add Text Field'" :addAction="addTextField">

    </AddFieldFrame>
</template>

<script setup lang="ts">
import AddFieldFrame from '@/Components/AddFieldFrame.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import {FieldType} from '@/enums';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { addFieldDialog, addFieldDialogType } = storeToRefs(bugFormStore);

const addTextField = () => {
    addFieldDialogType.value = FieldType.TEXT;
    addFieldDialog.value = true
}

</script>