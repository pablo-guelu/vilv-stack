<template>
    <v-card :id="`field_${rowIndex}_${columnIndex}`" flat class="field_frame field_border rounded-lg pa-4" :ondrop="dropHandler" :ondragover="dragOverHandler"  :row_index="rowIndex" :col_index="columnIndex"
        :class="{ 'field_selected': (currentRowIndex === rowIndex && currentColumnIndex === columnIndex && sideEditorMode === SideEditionMode.FIELD) }"
        @click="handleClickFieldFrame" :ripple="false">
        <div v-if="!field.empty || formStructure.rows[rowIndex].columns[columnIndex].paragraph">
            <slot></slot>
            <div v-if="field" class="action-buttons">
                <v-btn class="delete-button" @click="() => warningDeleteField = true" icon="mdi-delete" size="x-small"
                    color="success" />
            </div>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import { FieldType, SideEditionMode } from '@/enums';
import { useBugFormStore } from '@/Stores/bugForm';
import { BugologField } from '@/types';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    field: BugologField;
    rowIndex: number;
    columnIndex: number;
}>();

const bugFormStore = useBugFormStore();
const { currentRowIndex, currentColumnIndex, warningDeleteField, sideEditorMode, formStructure } = storeToRefs(bugFormStore);
const { openSideEditor } = bugFormStore;

const handleClickFieldFrame = () => {
    currentRowIndex.value = props.rowIndex
    currentColumnIndex.value = props.columnIndex
    openSideEditor(props.field.type)
}

const dragOverHandler = (ev: DragEvent) => {
    ev.preventDefault();
    const dropZone = document.getElementById(`field_${props.rowIndex}_${props.columnIndex}`);
    const dropElement = ev.target;

    if (dropZone && dropElement && dropZone.contains(dropElement as Node)) {
        sideEditorMode.value = SideEditionMode.FIELD;
        currentRowIndex.value = props.rowIndex;
        currentColumnIndex.value = props.columnIndex;
    }
}

const dropHandler = (ev: DragEvent) => {
    
    ev.preventDefault();
    let type = ev.dataTransfer!.getData("type");
    const dropZone = document.getElementById(`field_${props.rowIndex}_${props.columnIndex}`);
    const dropElement = ev.target as HTMLElement;

    if (dropZone && dropElement && dropZone.contains(dropElement as Node) && dropElement.id !== 'form_canvas' && Object.values(FieldType).includes(type as FieldType)) {
        formStructure.value.rows[props.rowIndex].columns[props.columnIndex].field!.type = type as FieldType;
        formStructure.value.rows[props.rowIndex].columns[props.columnIndex].field!.empty = false;

        sideEditorMode.value = SideEditionMode.FIELD;
        currentRowIndex.value = props.rowIndex;
        currentColumnIndex.value = props.columnIndex;
        openSideEditor(type as FieldType);
    }
}
</script>

<style scoped>
.field_frame {
    position: relative;
}

.field_border {
    border: 2px dashed grey;
    border-radius: 12px;
}

.action-buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.edit-button,
.delete-button {
    margin-left: 10px;
}

.field_selected {
    border: 2px solid #4CAF50;
}
</style>