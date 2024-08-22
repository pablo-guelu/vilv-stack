<template>
    
        <v-sheet class="d-flex justify-space-between w-100 mb-4 mb-md-16 pa-6" rounded="lg">
            <div class="text-h4">Preview</div>
            <v-btn color="primary" href="/form">FORMS</v-btn>
            <v-btn color="primary" @click="saveForm">Save</v-btn>
            <v-btn color="primary" @click="newForm"> New</v-btn>
        </v-sheet>

        <!-- FORM CANVAS -->

        <v-card class="pa-8 mt-8" flat>
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
import { SideEditionMode } from '@/enums';

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