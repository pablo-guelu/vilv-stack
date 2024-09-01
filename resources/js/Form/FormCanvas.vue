<template>

    <v-tabs v-model="bugologMode" class="my-10">
        <v-tab :value="BugologMode.FORM">Form</v-tab>
        <v-tab :value="BugologMode.INFO">Info Page</v-tab>
    </v-tabs>

    <v-tabs-window v-model="bugologMode">
        <v-tabs-window-item :value="BugologMode.FORM">
            <!-- FORM CANVAS -->
            <v-window v-model="formMode">
                <!-- EDIT FORM AND INFO PAGE -->
                <v-window-item :value="FormMode.EDIT">
                    <v-card class="pt-8 ps-4 mt-4" border>
                        <v-row class="ps-6 pe-10 mb-5">
                            <v-tooltip text="Dashboard">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" href="/form" variant="tonal"
                                        icon="mdi-monitor-dashboard"></v-btn>
                                </template>
                            </v-tooltip>
                            <div class="ms-auto">
                                <v-tooltip text="Preview">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind="props" class="mx-3" @click="formMode = FormMode.PREVIEW"
                                            variant="tonal" icon="mdi-eye-check-outline"></v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Save form">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind="props" class="mx-3" @click="saveForm" variant="tonal"
                                            icon="mdi-content-save"></v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="New form">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind="props" @click="newForm" variant="tonal" icon="mdi-plus"></v-btn>
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
                        <v-sheet v-if="formStructure.rows.length > 0" id="form_canvas" :ondragover="dragRowOverHandler"
                            :ondrop="dropRowHandler">
                            <template v-for="row, rowIndex in formStructure.rows" :key="`row-${rowIndex}`">
                                <RowFrame :index="rowIndex" :row="row" />
                            </template>
                        </v-sheet>
                    </v-card>
                </v-window-item>

                <v-window-item :value="FormMode.PREVIEW">
                    <PreviewForm />
                </v-window-item>
            </v-window>
        </v-tabs-window-item>

        <v-tabs-window-item :value="BugologMode.INFO" >
            INFO
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

const bugFormStore = useBugFormStore();
const { formStructure, formTitle, currentRowIndex, currentColumnIndex, sideEditorMode, formMode, bugologMode } = storeToRefs(bugFormStore);
const { requiredRule, newForm, saveForm, addRow } = bugFormStore

const enableFormTitleEdit = ref(false);
enableFormTitleEdit.value = formTitle.value === ''

watch([formTitle, route.name], () => {
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

    if (dropZone && dropElement && dropElement.id === 'form_canvas') {
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