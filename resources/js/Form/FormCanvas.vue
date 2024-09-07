<template>

    <div class="d-flex justify-space-between align-center">
        <v-tabs v-model="bugologMode" class="my-10">
            <v-tab :value="BugologMode.FORM">
                <v-icon class="me-2">mdi-format-align-justify</v-icon>
                Form</v-tab>
            <v-tab :value="BugologMode.MESSAGE">
                <v-icon class="me-2">mdi-email-fast-outline</v-icon>
                Message / Log</v-tab>
        </v-tabs>
        <div class="d-flex justify-self-end">
            <v-btn prepend-icon="mdi-monitor-dashboard" variant="tonal" color="primary" href="/form"
                class="me-4">Dashboard</v-btn>
            <v-btn prepend-icon="mdi-plus" variant="tonal" color="primary" @click="newForm">New Form</v-btn>
        </div>
    </div>

    <v-tabs-window v-model="bugologMode">
        <v-tabs-window-item :value="BugologMode.FORM">
            <!-- FORM CANVAS -->
            <v-window v-model="formMode">
                <!-- EDIT FORM-->
                <v-window-item :value="FormMode.EDIT">
                    <v-card class="pt-8 px-4 mt-4" border>
                        <v-row class="px-4 mb-5">
                            <v-tooltip location="top" text="Save form">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" class="mx-3" color="primary" @click="saveForm"
                                        icon="mdi-content-save"></v-btn>
                                </template>
                            </v-tooltip>
                            <div class="ms-auto">
                                <v-tooltip location="top" text="Preview">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind="props" class="mx-3" @click="formMode = FormMode.PREVIEW"
                                            variant="tonal" icon="mdi-eye-outline"></v-btn>
                                    </template>
                                </v-tooltip>
                            </div>
                        </v-row>
                        <v-row>
                            <v-col cols="9">
                                <!-- FORM TITLE -->
                                <div class="d-flex justify-start align-center ms-6">
                                    <div v-if="!enableFormTitleEdit" class="text-h4 me-1">{{ formTitle }}</div>
                                    <v-text-field class="me-2" label="Form's Title" v-if="enableFormTitleEdit"
                                        variant="outlined" v-model="formTitle" :rules="[requiredRule]"></v-text-field>
                                    <v-btn :class="{ 'mb-4': enableFormTitleEdit }"
                                        :icon="enableFormTitleEdit ? 'mdi-content-save' : 'mdi-pencil'"
                                        @click="() => enableFormTitleEdit ? enableFormTitleEdit = false : enableFormTitleEdit = true"
                                        variant="plain" />
                                </div>
                            </v-col>
                        </v-row>
                        <v-sheet id="form_canvas" :min-height="100" :ondragover="dragRowOverHandler"
                            :ondrop="dropRowHandler">
                            <template v-for="row, index in formStructure.rows">
                                <RowFrame :index="index" :row="row" />
                            </template>
                        </v-sheet>
                    </v-card>
                </v-window-item>

                <v-window-item :value="FormMode.PREVIEW">
                    <PreviewForm />
                </v-window-item>
            </v-window>
        </v-tabs-window-item>

        <v-tabs-window-item :value="BugologMode.MESSAGE">
            <PreviewMessage :formStructure="formStructure" />
        </v-tabs-window-item>

    </v-tabs-window>


</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import RowFrame from '../Row/RowFrame.vue';
import { ref, watch } from 'vue';
import { BugologMode, FormMode, SideEditionMode } from '@/enums';
import PreviewForm from './Components/PreviewForm.vue';
import PreviewMessage from './Components/PreviewMessage.vue';

const bugFormStore = useBugFormStore();
const { formStructure, formTitle, currentRowIndex, currentColumnIndex, sideEditorMode, formMode, bugologMode } = storeToRefs(bugFormStore);
const { requiredRule, newForm, saveForm, addRow } = bugFormStore

const enableFormTitleEdit = ref(false);
enableFormTitleEdit.value = formTitle.value === ''

watch(formTitle, () => {
    if (formTitle.value === '') { enableFormTitleEdit.value = true }
})

const dragRowOverHandler = (ev: DragEvent) => {
    ev.preventDefault();
    const dropZone = document.getElementById('form_canvas');
    dropZone!.classList.add('droppable_form');

}

const dropRowHandler = (ev: DragEvent) => {

    ev.preventDefault();
    let numbreOfCols = ev.dataTransfer!.getData("columns");
    const dropZone = document.getElementById('form_canvas');
    const dropElement = ev.target as HTMLElement;
    console.log(ev.currentTarget, ev.dataTransfer!.getData("type"));

    if (dropZone && dropElement && (ev.currentTarget as HTMLElement) && ev.dataTransfer!.getData("type") === '') {
        addRow(Number(numbreOfCols));

        sideEditorMode.value = SideEditionMode.FIELD;
        currentRowIndex.value = formStructure.value.rows.length - 1;
        currentColumnIndex.value = 0;
    }

    dropZone!.classList.remove('droppable_form');
}

</script>

<style scoped>
.droppable_form {
    border: 2px solid #9e29ec !important;
}
</style>