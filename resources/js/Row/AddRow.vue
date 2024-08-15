<template>
    <div>
        <AddFieldFrame title="Add Row" :addAction="() => addRow(columnsNumber)">
            <v-text-field v-model="columnsNumber" label="number of columns"variant="outlined" type="number" max="2" min="1"></v-text-field>
        </AddFieldFrame>
    </div>
</template>

<script lang="ts" setup>
import AddFieldFrame from '@/Components/AddFieldFrame.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { ref } from 'vue';

const bugFormStore = useBugFormStore();
const { addRow } = bugFormStore;

const columnsNumber = ref(1);

</script>