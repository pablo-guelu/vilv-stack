<template>
    <v-select variant="outlined" density="compact" label="Input Type" :items="inputTypesItems" v-model="defaultField.inputType">
    </v-select>
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { defaultField } = storeToRefs(bugFormStore);

const inputTypesItems = ['text', 'email', 'password', 'number', 'url', 'tel', 'search', 'date', 'datetime-local', 'month', 'week', 'time', 'color'];


</script>