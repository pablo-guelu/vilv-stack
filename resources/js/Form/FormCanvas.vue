<template>
    <div class="w-100 mt-6 mb-2 d-flex justify-end">
        <!-- FORM TITLE -->
        <div class="d-flex flex-grow-1 justify-start align-center ms-2 me-auto">
            <div v-if="!enableFormTitleEdit" class="text-h5 me-1">{{ formTitle }}</div>
            <v-text-field label="Form's Title" v-if="enableFormTitleEdit" variant="outlined" v-model="formTitle"
                density="compact" :rules="[requiredRule]"></v-text-field>
            <v-btn :class="{ 'mb-4': enableFormTitleEdit }"
                :icon="enableFormTitleEdit ? 'mdi-content-save' : 'mdi-pencil'"
                @click="() => enableFormTitleEdit ? enableFormTitleEdit = false : enableFormTitleEdit = true"
                variant="plain" />
        </div>
    </div>

    <div class="d-flex justify-space-between align-center">
        <v-tabs v-model="bugologMode" center-active class="">
            <v-tab :value="BugologMode.FORM">
                <v-icon >mdi-file-edit-outline</v-icon>
                <span v-if="!smAndDown" class="ms-2">Form</span></v-tab>
            <v-tab :value="BugologMode.PREVIEW">
                <v-icon >mdi-eye-outline</v-icon>
                <span v-if="!smAndDown" class="ms-2">Preview</span></v-tab>
            <v-tab :value="BugologMode.MESSAGE">
                <v-icon>mdi-email-fast-outline</v-icon>
                <span v-if="!smAndDown" class="ms-2">Message / Log</span></v-tab>
            <v-tab :value="BugologMode.PUBLISH">
                <v-icon >mdi-creation</v-icon>
                <span v-if="!smAndDown" class="ms-2">Publish</span></v-tab>
        </v-tabs>
        <v-btn v-if="!smAndDown" prepend-icon="mdi-content-save" variant="tonal" color="primary" @click="saveForm" class="my-1">Save</v-btn>
        <v-btn v-if="smAndDown" icon="mdi-content-save" variant="tonal" color="primary" @click="saveForm" class="my-1" />
    </div>

    <v-tabs-window v-model="bugologMode">
        <v-tabs-window-item :value="BugologMode.FORM">
            <!-- FORM CANVAS -->
            <v-card class="pt-8 px-4 mt-4 border" :theme="formStructure.defaultTheme">
                <v-row class="px-4 mb-4 justify-end">
                    <!-- IMPORT -->
                    <v-tooltip location="top" text="Import form">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" class="mx-1" color="primary" variant="tonal" size="small" @click="importForm"
                                icon="mdi-file-import-outline"></v-btn>
                        </template>
                    </v-tooltip>

                    <!-- EXPORT -->
                    <v-tooltip location="top" text="Export form">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" class="mx-1" color="primary" variant="tonal" size="small" @click="exportForm"
                                icon="mdi-file-export-outline"></v-btn>
                        </template>
                    </v-tooltip>
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

        <v-tabs-window-item :value="BugologMode.MESSAGE">
            <PreviewMessage :formStructure="formStructure" />
        </v-tabs-window-item>

        <v-tabs-window-item :value="BugologMode.PUBLISH">
            <PublishForm />
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
import PublishForm from './Components/PublishForm.vue';
import { useDisplay } from 'vuetify';
const { smAndDown } = useDisplay();
const bugFormStore = useBugFormStore();
const { formStructure, formTitle, currentRowIndex, currentColumnIndex, sideEditorMode, bugologMode } = storeToRefs(bugFormStore);
const { requiredRule, saveForm, addRow, exportForm, importForm } = bugFormStore

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