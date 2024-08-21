<template>

    <v-container style="max-width: 1700px;">
        <v-row>
            <v-col cols="12" md="3">
                <v-sheet class="pa-4" min-height="268" rounded="lg">
                    <v-slot name="side-column">
                        <v-row class="w-100 " no-gutters>
                            <v-col class="w-100">
                                <div class="mb-10">
                                    <AddRow :cols-number="1" />
                                    <AddRow :cols-number="2" />
                                </div>
                                <AddTextField/>
                                <AddHTMLEditor/>
                                <AddSelectField/>
                                <AddFileField/>
                                <AddTextAreaField/>
                            </v-col>
                        </v-row>
                    </v-slot>
                </v-sheet>
            </v-col>

            <v-col cols="12" md="9">
                <v-sheet rounded="lg">
                    <FormCanvas />
                </v-sheet>
            </v-col>
        </v-row>

        <AddFieldDialog />
        <WarningDialog v-model="warningMissingRow" :text="'Please add a row to add a Field'"/>
        <WarningDialog v-model="warningDeleteField" :text="'Are you sure you want to delete this Field?'" :warning-type="'info'" :action="() => deleteField(currentRowIndex, currentColumnIndex)"/>
        <WarningDialog v-model="warningDeleteRow" :text="'Are you sure you want to delete this Row?'" :warning-type="'info'" :action="() => deleteRow(currentRowIndex)"/>

    </v-container>
    
</template>

<script lang="ts" setup>
import FormCanvas from './FormCanvas.vue';
import AddTextField from '@/TextField/AddTextField.vue';
import AddRow from '@/Row/AddRow.vue';
import AddFieldDialog from '@/Form/Components/AddFieldDialog.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import AddHTMLEditor from '@/HTMLEditor/AddHTMLEditor.vue';
import AddSelectField from '@/SelectField/AddSelectField.vue';
import WarningDialog from './Components/WarningDialog.vue';
import AddFileField from '@/FileField/AddFileField.vue';
import AddTextAreaField from '@/TextAreaField/AddTextAreaField.vue';

const bugFormStore = useBugFormStore();
const { warningMissingRow, warningDeleteField, warningDeleteRow, currentRowIndex, currentColumnIndex } = storeToRefs(bugFormStore);
const { deleteField, deleteRow } = bugFormStore;


</script>