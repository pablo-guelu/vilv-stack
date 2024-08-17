<template>
    <v-sheet class="d-flex align-center w-100 row-border my-6 row_frame" @mouseover="showActions = true"
        @mouseleave="showActions = false" style="min-height: 80px">
        <div v-show="showActions" class="me-3 row_action_buttons">
            <v-btn color="red" size="small" fab icon="mdi-delete" @click="deleteRow(index)" />
        </div>
        <div class="w-100">
            <v-row v-if="row.colsNumber < 2 && row.columns.length === 1" no-gutters>
                <v-col cols="12">
                    <FieldFrame :field="row.columns[0].field" :row-index="index" :column-index="0">
                        <SelectorFieldType :field="row.columns[0].field!" />
                    </FieldFrame>
                </v-col>
            </v-row>
            <v-row v-else-if="row.columns.length === 2" no-gutters>
                <v-col cols="12" md="6" class="pe-2">
                    <FieldFrame :field="row.columns[0].field" :row-index="index" :column-index="0">
                        <SelectorFieldType :field="row.columns[0].field!" />
                    </FieldFrame>
                </v-col>
                <v-col cols="12" md="6" class="ps-2">
                    <FieldFrame :field="row.columns[1].field" :row-index="index" :column-index="1">
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
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify';

const { mdAndUp } = useDisplay();

const props = defineProps<{
    index: number,
    row: Row
}>()

console.log(props.row);

const bugFormStore = useBugFormStore();
const { formStructure, currentRowIndex } = storeToRefs(bugFormStore);
const { deleteRow } = bugFormStore;

const showActions = ref(false);

</script>

<style>

</style>