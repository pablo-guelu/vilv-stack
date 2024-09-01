<template>

    <div class="d-flex justify-space-between w-100 mt-8 p-2">
        <v-btn color="primary" href="/form">FORMS</v-btn>
        <v-btn color="primary" @click="saveForm">Save</v-btn>
        <v-btn color="primary" @click="newForm"> New</v-btn>
    </div>

    <!-- FORM CANVAS -->
    <v-card class="pt-8 ps-4 mt-4" border>
        <v-row>
            <v-col cols="9">
                <!-- FORM TITLE -->
                
                <div class="d-flex justify-start align-center ms-6">
                    <div v-if="!enableFormTitleEdit" class="text-h4 me-1">{{formTitle}}</div>
                    <v-text-field class="me-2" label="Form's Title" v-if="enableFormTitleEdit" variant="outlined"
                    v-model="formTitle" :rules="[requiredRule]"></v-text-field>
                    <v-btn :class="{'mb-4' : enableFormTitleEdit }" :icon="enableFormTitleEdit ? 'mdi-content-save' : 'mdi-pencil'" @click="() => enableFormTitleEdit ? enableFormTitleEdit = false : enableFormTitleEdit = true" variant="tonal" />
                </div>
            </v-col>
        </v-row>
        <v-sheet v-if="formStructure.rows.length > 0" id="form_canvas" :ondragover="dragRowOverHandler" :ondrop="dropRowHandler" >
            <template v-for="row, rowIndex in formStructure.rows" :key="`row-${rowIndex}`">
                <RowFrame :index="rowIndex" :row="row" />
            </template>
        </v-sheet>
    </v-card>

</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import RowFrame from '../Row/RowFrame.vue';
import { ref, watch } from 'vue';
import { SideEditionMode } from '@/enums';

const bugFormStore = useBugFormStore();
const { formStructure, formTitle, currentRowIndex, currentColumnIndex, sideEditorMode } = storeToRefs(bugFormStore);
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

    if (dropZone && dropElement && dropElement.id === 'form_canvas' ) {
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