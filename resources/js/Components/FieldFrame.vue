<template>
    <div class="field-frame">
        <slot></slot>
        <div class="action-buttons">
            <!-- <v-btn class="edit-button" @click="editField" icon="mdi-pencil" size="x-small" color="success" /> -->
            <v-btn class="delete-button" @click="deleteColumn(rowIndex, columnIndex)" icon="mdi-delete" size="x-small" color="success" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';

const props = defineProps<{
    rowIndex: number;
    columnIndex: number;
}>();

const bugFormStore = useBugFormStore();
const { deleteColumn } = bugFormStore;
</script>

<style scoped>
.field-frame {
    position: relative;
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
</style>