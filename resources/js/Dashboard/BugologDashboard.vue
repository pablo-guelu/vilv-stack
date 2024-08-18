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

    </v-container>
    
</template>

<script lang="ts" setup>
import FormCanvas from './FormCanvas.vue';
import AddTextField from '@/TextField/AddTextField.vue';
import AddRow from '@/Row/AddRow.vue';
import AddFieldDialog from '@/Dashboard/Components/AddFieldDialog.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import AddHTMLEditor from '@/HTMLEditor/AddHTMLEditor.vue';
import AddSelectField from '@/Select/AddSelectField.vue';
import WarningDialog from './Components/WarningDialog.vue';
import AddFileField from '@/FileField/AddFileField.vue';

const bugFormStore = useBugFormStore();
const { warningMissingRow } = storeToRefs(bugFormStore);


</script>