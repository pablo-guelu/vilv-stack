<template>
    <v-sheet class="pa-2 pa-md-8" rounded="lg">
        <v-sheet class="d-flex justify-space-between w-100 mb-4 mb-md-16">
            <div class="text-h4">Preview</div>
        </v-sheet>

        <!-- FORM CANVAS -->
        <v-sheet v-if="clientForm.rows.length > 0">
            <template v-for="row, rowIndex in clientForm.rows" :key="`row-${rowIndex}`">
                <RowFrame :index="rowIndex" :row="row" />
            </template>
        </v-sheet>
    </v-sheet>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import RowFrame from '../Row/RowFrame.vue';

const bugFormStore = useBugFormStore();
const { formStructure } = storeToRefs(bugFormStore);

const clientForm = computed(() => formStructure.value);

console.log(clientForm.value);

</script>