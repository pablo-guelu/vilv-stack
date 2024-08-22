<template>

    <v-container fluid>
        <v-row>
            <v-col md="3">
                <v-sheet min-height="268" rounded="lg">

                    <v-row class="w-100 " no-gutters>
                        <v-col class="w-100">
                            <div class="mb-10">
                                <AddRow :cols-number="1" />
                                <AddRow :cols-number="2" />
                            </div>
                            <AddTextField />
                            <AddHTMLEditor />
                            <AddSelectField />
                            <AddFileField />
                            <AddTextAreaField />
                        </v-col>
                    </v-row>

                </v-sheet>
            </v-col>

            <v-col cols="6">
                <v-sheet rounded="lg">
                    <FormCanvas />
                </v-sheet>
            </v-col>

            <v-col cols="3">
                <v-sheet min-height="268" rounded="lg">

                    <v-tabs v-model="sideEditorMode" align-tabs="center" color="deep-purple-accent-4">
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
import AddTextField from '@/TextField/AddTextField.vue';
import AddRow from '@/Row/AddRow.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import AddHTMLEditor from '@/HTMLEditor/AddHTMLEditor.vue';
import AddSelectField from '@/SelectField/AddSelectField.vue';
import WarningDialog from './Components/WarningDialog.vue';
import AddFileField from '@/FileField/AddFileField.vue';
import AddTextAreaField from '@/TextAreaField/AddTextAreaField.vue';
import FieldSideEditor from './Components/FieldSideEditor.vue';
import FormSideEditor from './Components/FormSideEditor.vue';
import { SideEditionMode } from '@/enums';

const bugFormStore = useBugFormStore();
const { warningMissingRow, warningDeleteField, warningDeleteRow, currentRowIndex, currentColumnIndex, sideEditorMode } = storeToRefs(bugFormStore);
const { deleteField, deleteRow } = bugFormStore;


</script>