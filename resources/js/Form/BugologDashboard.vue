<template>

    <v-container class="h-100 pa-0" fluid>

        <v-row class="h-100">
            <v-col md="3">
                <v-sheet class="pt-16 px-4 h-100 border-e-sm" color="">
                    <v-row class="w-100 mt-6" no-gutters>
                        <v-col class="w-100">
                            <div class="mb-10">
                                <AddRow :cols-number="1" />
                                <AddRow :cols-number="2" />
                            </div>
                            <template v-for="type in fieldTypes" :key="type">
                                <AddFieldFrame :fieldType="type" draggable="true" :id="`${type}_field`"
                                    :ondragstart="dragStartHandler" :ondragend="dragEndHandler" />
                            </template>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>

            <v-col cols="6">
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
                            <v-text-field variant="outlined" density="compact"
                                placeholder="Here the name of your form..." v-model="formTitle"
                                :rules="[requiredRule]"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-sheet v-if="formStructure.rows.length > 0">
                        <template v-for="row, rowIndex in formStructure.rows" :key="`row-${rowIndex}`">
                            <RowFrame :index="rowIndex" :row="row" />
                        </template>
                    </v-sheet>
                </v-card>
            </v-col>

            <v-col cols="3">
                <v-sheet class="pt-6 h-100 border-s-sm">
                    <v-tabs v-model="sideEditorMode" align-tabs="center">
                        <v-tab :value="SideEditionMode.FORM">Form</v-tab>
                        <v-tab :value="SideEditionMode.FIELD">Field</v-tab>
                    </v-tabs>
                    <v-tabs-window v-model="sideEditorMode">
                        <v-tabs-window-item :key="SideEditionMode.FORM" :value="SideEditionMode.FORM">
                            <FormSideEditor />
                        </v-tabs-window-item>
                        <v-tabs-window-item :key="SideEditionMode.FIELD" :value="SideEditionMode.FIELD">
                            <FieldSideEditor />
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-sheet>
            </v-col>
        </v-row>

        <WarningDialog v-model="warningMissingRow" :text="'Please add a row to add a Field'" />
        <WarningDialog v-model="warningDeleteField" :text="'Are you sure you want to delete this Field?'"
            :warning-type="'info'" :action="() => deleteField(currentRowIndex, currentColumnIndex)" />
        <WarningDialog v-model="warningDeleteRow" :text="'Are you sure you want to delete this Row?'"
            :warning-type="'info'" :action="() => deleteRow(currentRowIndex)" />

    </v-container>

</template>

<script lang="ts" setup>
import AddRow from '@/Row/AddRow.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import WarningDialog from './Components/WarningDialog.vue';
import FieldSideEditor from './Components/FieldSideEditor.vue';
import FormSideEditor from './Components/FormSideEditor.vue';
import { FieldType, SideEditionMode } from '@/enums';
import AddFieldFrame from '@/Components/AddFieldFrame.vue';
import { router } from '@inertiajs/vue3';
import FormLabel from '@/Components/FormLabel.vue';
import RowFrame from '@/Row/RowFrame.vue';

const bugFormStore = useBugFormStore();
const { warningMissingRow, warningDeleteField, warningDeleteRow, currentRowIndex, currentColumnIndex, sideEditorMode, formStructure, formTitle, formId } = storeToRefs(bugFormStore);
const { deleteField, deleteRow, requiredRule, newForm, emptyField } = bugFormStore;

const fieldTypes =
    [
        FieldType.TEXT,
        FieldType.HTML,
        FieldType.SELECT,
        FieldType.FILES,
        FieldType.TEXT_AREA,
    ];


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

const dragStartHandler = (ev: DragEvent) => {
    (ev.currentTarget as HTMLElement).classList.add('draggable_selected');
    ev.dataTransfer!.setData("type", (ev.target as HTMLElement).id.split('_')[0]); // getting the field type without 'field_'
    ev.dataTransfer!.effectAllowed = "copyMove";
}

const dragEndHandler = (ev: DragEvent) => {
    (ev.currentTarget as HTMLElement).classList.remove('draggable_selected');
}


</script>

<style>
.draggable_selected {
    border: 2px solid #4CAF50 !important;
}

</style>