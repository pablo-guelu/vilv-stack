<template>
    <div class="field-frame field_border rounded-lg pa-4" :class="{'field_selected' : (currentRowIndex === rowIndex && currentColumnIndex === columnIndex)}" @click="() => {
        currentRowIndex = rowIndex
        currentColumnIndex = columnIndex
        }">
        <slot></slot>
        <div v-if="field" class="action-buttons">
            <v-btn class="edit-button" @click="editColumn(rowIndex, columnIndex)" icon="mdi-pencil" size="x-small" color="success" />
            <v-btn class="delete-button" @click="deleteColumn(rowIndex, columnIndex)" icon="mdi-delete" size="x-small" color="success" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { BugologField } from '@/types';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    field: BugologField | undefined;
    rowIndex: number;
    columnIndex: number;
}>();

const bugFormStore = useBugFormStore();
const { currentRowIndex, currentColumnIndex } = storeToRefs(bugFormStore);
const { deleteColumn, editColumn } = bugFormStore;
</script>

<style scoped>
.field-frame {
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