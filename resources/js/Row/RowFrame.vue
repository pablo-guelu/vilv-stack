<template>
    <v-sheet class="d-flex align-center w-100 my-3 row_container px-2" style="min-height: 80px" @mouseover="showDelete = true" @mouseleave=" showDelete = false" >
        <div class="mx-3 row_action_buttons">
            <v-tooltip location="top" text="Delete row">
                <template v-slot:activator="{ props }" >
                    <v-btn v-bind="props" v-if="showDelete && index === currentRowIndex" color="red" size="small" fab icon="mdi-delete" @click="() => warningDeleteRow = true" />
                </template>
            </v-tooltip>
        </div>
        <div class="w-100">
            <v-row v-if="row.colsNumber < 2 && row.columns.length === 1">
                <v-col cols="12">
                    <FieldFrame class="droppable_field" :field="row.columns[0].field!" :row-index="index" :column-index="0" >
                        <SelectorFieldType :field="row.columns[0].field!" />
                    </FieldFrame>
                </v-col>
            </v-row>
            <v-row v-else-if="row.columns.length === 2">    
                <v-col cols="12" md="6">
                    <FieldFrame class="droppable_field" :field="row.columns[0].field!" :row-index="index" :column-index="0">
                        <SelectorFieldType :field="row.columns[0].field!" />
                    </FieldFrame>
                </v-col>
                <v-col cols="12" md="6">
                    <FieldFrame class="droppable_field" :field="row.columns[1].field!" :row-index="index" :column-index="1">
                        <SelectorFieldType :field="row.columns[1].field!" />
                    </FieldFrame>
                </v-col>
            </v-row>
        </div>

        <div class="d-flex align-center ps-4 ms-auto">
            <v-avatar color="surface-variant"> {{ index + 1 }} </v-avatar>
        </div>
    </v-sheet>
</template>

<script lang="ts" setup>
import FieldFrame from '@/Components/FieldFrame.vue';
import SelectorFieldType from '@/Components/SelectorFieldType.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { Row } from '@/types';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const props = defineProps<{
    index: number,
    row: Row
}>()

const showDelete = ref(false);
const bugFormStore = useBugFormStore();
const { warningDeleteRow, currentRowIndex } = storeToRefs(bugFormStore);

</script>

<style>

.row_container {
    position: relative;
}

.row_action_buttons {
    position: absolute;
    left: -20px;
    top: 40%;
    z-index: 1;
}

.row_border {
    border: 2px dashed grey;
    border-radius: 12px;
}

</style>