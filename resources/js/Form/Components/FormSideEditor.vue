<template>
    <div class="d-flex justify-center w-100">
        <v-card width="400px" class="py-3 px-2" rounded="lg" flat>
            <v-form ref="fieldForm" fastfail class="mt-16">

                <v-select label="Form Variant" variant="outlined" density="compact" :items="variants" v-model="formStructure.variant" @update:model-value="updateVariant" ></v-select>

                <v-select label="Field Density" variant="outlined" density="compact" :items="densities" v-model="formStructure.density" @update:model-value="updateDensity" ></v-select>
                
                <v-select label="Theme" variant="outlined" density="compact" :items="themes" v-model="formStructure.defaultTheme" ></v-select>

                <v-checkbox label="Show Form's title" v-model="formStructure.showTitle" />
            </v-form>

            <div class="w-100 d-flex justify-center mt-10">
                <v-btn @click="saveForm" color="primary" class="mx-3" flat block append-icon="mdi-content-save" >Save</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { formStructure } = storeToRefs(bugFormStore);
const {saveForm } = bugFormStore;

const variants = ref([
    "filled",
    "underlined",
    "outlined",
    "plain",
    "solo",
    "solo-inverted",
    "solo-filled"
])

const densities = ref([
    "compact",
    "comfortable",
    "default",
])

// const selectedVariant = ref();
// const selectedDensity = ref();


const updateVariant = () => {
    // formStructure.value.variant = selectedVariant.value;
    for ( let row = 0; row < formStructure.value.rows.length; row++) {
        if (formStructure.value.rows[row].columns) {
            for (let column = 0; column < formStructure.value.rows[row].columns.length; column++) {
                formStructure.value.rows[row].columns[column].field!.variant = formStructure.value.variant;
            }
        }
    }
}

const updateDensity = () => {
    // formStructure.value.density = selectedDensity.value;
    for ( let row = 0; row < formStructure.value.rows.length; row++) {
        if (formStructure.value.rows[row].columns) {
            for (let column = 0; column < formStructure.value.rows[row].columns.length; column++) {
                formStructure.value.rows[row].columns[column].field!.density = formStructure.value.density;
            }
        }
    }
}

const themes = ref([
    "light",
    "dark",
])


</script>