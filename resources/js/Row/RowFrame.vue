<template>
    <v-sheet class="d-flex align-center w-100 row-border pa-4 my-6" :class="{'row-selected' : rowIndex === index}" @mouseover="showActions = true"
        @mouseleave="showActions = false" @click="() => rowIndex =index" style="min-height: 80px">
        <div v-if="showActions" class="me-6">
            <v-btn color="red" size="small" fab icon="mdi-delete" @click="deleteRow(index)" />
        </div>
            <div class="px-4 flex-grow-1 flex-shrink-0">
                <v-row v-if="row.colsNumber < 2 &&  row.columns.length === 1" class="">
                    <v-col cols="12">
                        <FieldFrame v-if="row.columns[0].field" :row-index="index" :column-index="0" >
                            <SelectorFieldType :field="row.columns[0].field" />
                        </FieldFrame>
                    </v-col>
                </v-row>
                <v-row v-else-if="row.columns.length === 2">
                    <v-col cols="12" md="6">
                        <FieldFrame v-if="row.columns[0].field" :row-index="index" :column-index="0" >
                            <SelectorFieldType :field="row.columns[0].field" />
                        </FieldFrame>
                    </v-col>
                    <v-col cols="12" md="6" class="border-s-md">
                        <FieldFrame v-if="row.columns[1].field" :row-index="index" :column-index="1" >
                            <SelectorFieldType :field="row.columns[1].field" />
                        </FieldFrame>
                    </v-col>
                </v-row>
            </div>

        <div class="d-flex align-center ms-auto">
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
import { computed, ref } from 'vue';

const props = defineProps<{
    index: number,
    row: Row
}>()

console.log(props.row);

const bugFormStore = useBugFormStore();
const { formStructure, rowIndex } = storeToRefs(bugFormStore);
const { deleteRow } = bugFormStore;

const showActions = ref(false);

const columns = computed(() => formStructure.value.rows[props.index].columns);

</script>

<style>
.row-border {
    border: 2px dashed grey;
    border-radius: 12px;
}

.row-selected {
    border: 2px solid #4CAF50;
}
</style>