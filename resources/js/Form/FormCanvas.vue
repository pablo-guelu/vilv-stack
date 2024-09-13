<template>
    <div class="w-100 my-8 d-flex justify-end">
        <v-btn prepend-icon="mdi-monitor-dashboard" variant="tonal" color="primary" href="/form"
            class="me-4">Dashboard</v-btn>
        <v-btn prepend-icon="mdi-plus" variant="tonal" color="primary" @click="newForm">New Form</v-btn>
    </div>

    <div class="d-flex justify-space-between align-center">
        <v-tabs v-model="bugologMode" class="">
            <v-tab :value="BugologMode.FORM">
                <v-icon class="me-2">mdi-file-edit-outline</v-icon>
                Form</v-tab>
            <v-tab :value="BugologMode.PREVIEW">
                <v-icon class="me-2">mdi-eye-outline</v-icon>
                Preview</v-tab>
            <v-tab :value="BugologMode.SETTINGS">
                <v-icon class="me-2">mdi-cog</v-icon>
                Settings</v-tab>
            <v-tab :value="BugologMode.MESSAGE">
                <v-icon class="me-2">mdi-email-fast-outline</v-icon>
                Message / Log</v-tab>
        </v-tabs>
    </div>

    <v-tabs-window v-model="bugologMode">
        <v-tabs-window-item :value="BugologMode.FORM">
            <!-- FORM CANVAS -->
            <v-card class="pt-8 px-4 mt-4 border">
                <v-row class="px-4 mb-5">
                    <!-- IMPORT -->
                    <v-tooltip location="top" text="Import form">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" class="mx-3" color="secondary" @click="importForm"
                                icon="mdi-file-import-outline"></v-btn>
                        </template>
                    </v-tooltip>

                    <!-- EXPORT -->
                    <v-tooltip location="top" text="Export form">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" class="mx-3" color="secondary" @click="exportForm"
                                icon="mdi-file-export-outline"></v-btn>
                        </template>
                    </v-tooltip>

                    <div class="ms-auto">
                        <!-- SAVE -->
                        <v-tooltip location="top" text="Save form">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" class="" color="primary" @click="saveForm"
                                    icon="mdi-content-save"></v-btn>
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
                <v-sheet id="form_canvas" :min-height="100" :ondragover="dragRowOverHandler" :ondrop="dropRowHandler">
                    <template v-for="row, index in formStructure.rows">
                        <RowFrame :index="index" :row="row" />
                    </template>
                </v-sheet>
            </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item :value="BugologMode.PREVIEW">
            <PreviewForm />
        </v-tabs-window-item>

        <v-tabs-window-item :value="BugologMode.SETTINGS">
            <Settings />
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
import { BugologMode, SideEditionMode } from '@/enums';
import PreviewForm from './Components/PreviewForm.vue';
import PreviewMessage from './Components/PreviewMessage.vue';
import Settings from './Components/Settings.vue';
const bugFormStore = useBugFormStore();
const { formStructure, formTitle, currentRowIndex, currentColumnIndex, sideEditorMode, bugologMode } = storeToRefs(bugFormStore);
const { requiredRule, newForm, saveForm, addRow, exportForm, importForm } = bugFormStore

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