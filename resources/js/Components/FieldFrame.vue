<template>
    <v-card flat class="field-frame field_border rounded-lg pa-4"
        :class="{ 'field_selected': (currentRowIndex === rowIndex && currentColumnIndex === columnIndex && sideEditorMode === SideEditionMode.FIELD) }" @click="handleClickFieldFrame" :ripple="false" >
        <div v-if="!field.empty" >
            <slot></slot>
            <div v-if="field" class="action-buttons">
                <v-btn class="delete-button" @click="() => warningDeleteField = true" icon="mdi-delete" size="x-small"
                    color="success" />
            </div>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import { SideEditionMode } from '@/enums';
import { useBugFormStore } from '@/Stores/bugForm';
import { BugologField } from '@/types';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    field: BugologField;
    rowIndex: number;
    columnIndex: number;
}>();

const bugFormStore = useBugFormStore();
const { currentRowIndex, currentColumnIndex, warningDeleteField, sideEditorMode } = storeToRefs(bugFormStore);
const { openSideEditor } = bugFormStore;

const handleClickFieldFrame = () => {
    currentRowIndex.value = props.rowIndex
    currentColumnIndex.value = props.columnIndex
    openSideEditor(props.field.type)
}
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