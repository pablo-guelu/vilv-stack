<template>
    
        <div class="d-flex justify-space-between w-100 mt-8 p-2">
            <v-btn color="primary" href="/form">FORMS</v-btn>
            <v-btn color="primary" @click="saveForm">Save</v-btn>
            <v-btn color="primary" @click="newForm"> New</v-btn>
        </div>

        <!-- FORM CANVAS -->
        <v-card class="pt-8 ps-8 mt-4" border>
            <v-row>
                <v-col cols="9">
                    <FormLabel name="Form Title" />
                    <v-text-field variant="outlined" density="compact" placeholder="Here the name of your form..."
                        v-model="formTitle" :rules="[requiredRule]" ></v-text-field>
                </v-col>
            </v-row>
            <v-sheet v-if="formStructure.rows.length > 0" >
                <template v-for="row, rowIndex in formStructure.rows" :key="`row-${rowIndex}`">
                    <RowFrame :index="rowIndex" :row="row" />
                </template>
            </v-sheet>
        </v-card>

</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import RowFrame from '../Row/RowFrame.vue';
import FormLabel from '@/Components/FormLabel.vue';
import { router } from '@inertiajs/vue3';
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";

const bugFormStore = useBugFormStore();
const { formStructure, formTitle, formId, sideEditorMode } = storeToRefs(bugFormStore);
const {requiredRule, newForm } = bugFormStore

const saveForm = () => {
    if (route().current('form.create')) {
        // CREATE
        router.post('/form', {
            form_structure: JSON.stringify(formStructure.value),
            title: formTitle.value,
        });
        // UPDATE
    } else {
        router.put(`/form/${formId.value}`, {
            form_structure: JSON.stringify(formStructure.value),
            title: formTitle.value,
        });
    }
}

</script>