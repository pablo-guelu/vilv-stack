<template>
    <div>

        <v-card class="pt-8 mt-4" border>
            <v-row>
                <v-col cols="12">
                    <!-- FORM TITLE -->
                    <div class="d-flex justify-start align-center ms-6 mb-6">
                        <div class="text-h4 me-1">{{ form.title }}</div>
                    </div>
                </v-col>
            </v-row>
            <v-sheet v-if="form.form_structure.rows.length > 0" id="form_canvas">
                <template v-for="row, rowIndex in form.form_structure.rows" :key="`row-${rowIndex}`">
                    <RowPreviewFrame :row="row" />
                </template>
            </v-sheet>
        </v-card>


    </div>
</template>

<script lang="ts" setup>
import { Form } from '@/types';

defineProps<{
    form: Form
}>();
</script>