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
                                <AddFieldFrame :fieldType="type" />
                            </template>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>

            <v-col cols="6">
                <FormCanvas />
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
import FormCanvas from './FormCanvas.vue';
import AddRow from '@/Row/AddRow.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import WarningDialog from './Components/WarningDialog.vue';
import FieldSideEditor from './Components/FieldSideEditor.vue';
import FormSideEditor from './Components/FormSideEditor.vue';
import { FieldType, SideEditionMode } from '@/enums';
import { useDragAndDrop } from '@formkit/drag-and-drop/vue';
import AddFieldFrame from '@/Components/AddFieldFrame.vue';

const bugFormStore = useBugFormStore();
const { warningMissingRow, warningDeleteField, warningDeleteRow, currentRowIndex, currentColumnIndex, sideEditorMode } = storeToRefs(bugFormStore);
const { deleteField, deleteRow } = bugFormStore;

const fieldTypes =
    [
        FieldType.TEXT,
        FieldType.HTML,
        FieldType.SELECT,
        FieldType.FILES,
        FieldType.TEXT_AREA,
    ];
</script>