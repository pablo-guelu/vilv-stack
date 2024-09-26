<template>
    <div style="max-width: 1000px;" class="mx-auto py-16">

        <v-card class="py-8 my-4" border>
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

            <div class="d-flex justify-center" >
                <v-btn color="primary" size="large" class="mt-8">Submit</v-btn>
            </div>
        </v-card>



    </div>
</template>

<script lang="ts" setup>
import RowPreviewFrame from '@/Row/RowPreviewFrame.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { Form } from '@/types';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    form: Form
}>();

const bugStore = useBugFormStore();
const { formStructure, formTitle, formId, formSlug } = storeToRefs(bugStore);

formId.value = props.form.id;
formTitle.value = props.form.title;
formStructure.value = JSON.parse(props.form.form_structure as unknown as string);
formSlug.value = props.form.slug ?? '';
</script>