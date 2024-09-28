<template>
    <div>
        <FormView :formStructure="formStructure" :formTitle="formTitle" />
    </div>
</template>

<script lang="ts" setup>
import FormView from '@/Form/Components/FormView.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { formStructure, formTitle } = storeToRefs(bugFormStore);

</script>

<style scoped>
/* Add your custom styles here */
</style>