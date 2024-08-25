<template>
    <div class="d-flex justify-center w-100">
        <v-card width="400px" class="pa-8" rounded="lg">
            <v-card-title v-text="'Form Settings'" class="px-0 mb-3" />
            <v-form ref="fieldForm" fastfail>
                <v-select label="Form Variant" :variant="formStructure.variant" density="compact" :items="variants" v-model="selectedVariant" @update:model-value="updateVariant" ></v-select>
            </v-form>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { formStructure, formTitle } = storeToRefs(bugFormStore);
const { } = bugFormStore;

const variants = ref([
    "filled",
    "underlined",
    "outlined",
    "plain",
    "solo",
    "solo-inverted",
    "solo-filled"
])

const selectedVariant = ref();


const updateVariant = () => {
    formStructure.value.variant = selectedVariant.value;
    for ( let row = 0; row < formStructure.value.rows.length; row++) {
        if (formStructure.value.rows[row].columns) {
            for (let column = 0; column < formStructure.value.rows[row].columns.length; column++) {
                formStructure.value.rows[row].columns[column].field!.variant = selectedVariant.value;
            }
        }
    }
}


</script>