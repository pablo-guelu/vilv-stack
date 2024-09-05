<template>
    <v-card class="pt-8 mt-4" border>
        <v-row class="w-100">
            <v-tooltip text="Edit Form">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" class="ms-auto me-6"
                        @click="formMode = FormMode.EDIT"
                        variant="tonal"
                        icon="mdi-file-edit-outline"></v-btn>
                </template>
            </v-tooltip>
        </v-row>
        <v-row>
            <v-col cols="12">
                <!-- FORM TITLE -->
                <div class="d-flex justify-start align-center ms-6 mb-6">
                    <div class="text-h4 me-1">{{ formTitle }}</div>
                </div>
            </v-col>
        </v-row>
        <v-sheet v-if="formStructure.rows.length > 0" id="form_canvas">
            <template v-for="row, rowIndex in formStructure.rows" :key="`row-${rowIndex}`">
                <RowPreviewFrame :row="row" />
            </template>
        </v-sheet>
        <div class="d-flex justify-center">
            <v-btn class="ma-6" prepend-icon="mdi-eye-outline" variant="tonal" color="primary">Preview Message</v-btn>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import { FormMode } from '@/enums';
import RowPreviewFrame from '@/Row/RowPreviewFrame.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { formStructure, formTitle, formMode } = storeToRefs(bugFormStore);

</script>

<style scoped>
/* Add your custom styles here */
</style>