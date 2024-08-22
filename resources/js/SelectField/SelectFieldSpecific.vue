<template>
    <v-textarea clearable label="items" variant="outlined" v-model="defaultField.itemsString" placeholder="please add the items of your select field separated by a comma"
    @update:model-value="updateFieldItems" ></v-textarea>
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { defaultField, formStructure, currentRowIndex, currentColumnIndex } = storeToRefs(bugFormStore);

const updateFieldItems = () => {
    formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field!.items = defaultField.value.itemsString!.split(',');
}

</script>