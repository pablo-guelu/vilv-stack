<template>

    <v-container style="max-width: 1700px;">
        <v-row>
            <v-col cols="12" md="3">
                <v-sheet class="pa-4" min-height="268" rounded="lg">
                    <v-slot name="side-column">
                        <v-row class="w-100 " no-gutters>
                            <v-col>
                                <AddRow/>
                                <AddTextField/>
                                <AddHTMLEditor/>
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
    </v-container>
    
</template>

<script lang="ts" setup>
import FormCanvas from './FormCanvas.vue';
import AddTextField from '@/TextField/AddTextField.vue';
import AddRow from '@/Row/AddRow.vue';
import AddFieldDialog from '@/Dashboard/AddFieldDialog.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import AddHTMLEditor from '@/HTMLEditor/AddHTMLEditor.vue';

const bugFormStore = useBugFormStore();
const { addFieldDialogType } = storeToRefs(bugFormStore);


</script>