<template>
    <p class="text-body-1 my-4">Select Items:</p>
        <div>
            <template v-for="item, index in fieldItems" :key="`item-${index}`">
                <v-row no-gutters>
                    <v-col cols="2">
                        <v-btn class="pt-2" icon="mdi-delete" variant="plain" density="compact" @click="deleteItem(index)" ></v-btn>
                    </v-col>
                    <v-col>
                        <v-text-field class="pe-2" label="label" v-model="fieldItems![index]" variant="outlined" density="compact" ></v-text-field>
                    </v-col>
                </v-row>
            </template>
        </div>
        <v-btn variant="flat" color="primary" append-icon="mdi-plus" class="mt-2 mb-6" text="Add Option" @click="addItem" />
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const bugFormStore = useBugFormStore();
const { formStructure, currentRowIndex, currentColumnIndex } = storeToRefs(bugFormStore);

const fieldItems = computed(() => formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field?.items);

const addItem = () => {
    fieldItems.value!.push('');
}

const deleteItem = (index: number) => {
    fieldItems.value!.splice(index, 1);
}


</script>