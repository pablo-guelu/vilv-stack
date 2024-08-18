<template>
    <v-textarea clearable label="items" variant="outlined" v-model="defaultField.itemsString" placeholder="please add the items of your select field separated by a comma" ></v-textarea>
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { defaultField } = storeToRefs(bugFormStore);

</script>