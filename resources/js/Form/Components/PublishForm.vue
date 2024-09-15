<template>
    <v-sheet class="rounded-lg border mt-4 d-flex flex-column justify-center align-center pa-6">

        <FormSettings />

        <v-btn class="mt-6" append-icon="mdi-creation" color="success" @click="publishForm"
            :disabled="!formSlug" size="large">
            Publish
        </v-btn>
    </v-sheet>
</template>

<script setup lang="ts">
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { formSlug } = storeToRefs(bugFormStore);

import FormSettings from './FormSettings.vue';

const publishForm = () => {
    
};

</script>

<style scoped></style>