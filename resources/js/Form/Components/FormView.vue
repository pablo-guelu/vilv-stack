<template>
    <v-card class="py-8 my-4" border :theme="formStructure.defaultTheme">
        <v-row>
            <v-col cols="12">
                <!-- FORM TITLE -->
                <div v-if="formStructure.showTitle" class="d-flex justify-start align-center ms-6 mb-6">
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
            <v-btn color="primary" size="large" class="mt-8">Submit</v-btn>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import RowPreviewFrame from '@/Row/RowPreviewFrame.vue';
import { FormStructure } from '@/types';

const props = defineProps<{
    formStructure: FormStructure;
    formTitle: string;
}>();
</script>
