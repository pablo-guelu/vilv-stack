<template>
    <v-card class="pt-8 mt-4" border>
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
            <v-btn class="ma-6" prepend-icon="mdi-eye-outline" variant="tonal" color="primary" @click="() => bugologMode = BugologMode.MESSAGE" >Preview Message</v-btn>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import { BugologMode, FormMode } from '@/enums';
import RowPreviewFrame from '@/Row/RowPreviewFrame.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { formStructure, formTitle, formMode, bugologMode } = storeToRefs(bugFormStore);

</script>

<style scoped>
/* Add your custom styles here */
</style>