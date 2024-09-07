<template>
    <div>
        <div class="mt-4">
            <v-checkbox v-model="field!.checkboxMultiple" @update:modelValue="checkBoxValue" label="Allow Select Multiple Checkboxes" />
        </div>
        <p class="text-body-1 mb-4">Checkbox Options:</p>
        <div>
            <template v-for="checkbox, index in checkboxOptions" :key="checkbox.id">
                <v-row no-gutters>
                    <v-col cols="1">
                        <v-btn class="pt-2" icon="mdi-delete" variant="plain" density="compact" @click="deleteCheckbox(index)" ></v-btn>
                    </v-col>
                    <v-col>
                        <v-text-field class="pe-2" label="label" v-model="checkbox.label" variant="outlined" density="compact" ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field class="ps-2" label="value" v-model="checkbox.value" variant="outlined" density="compact" ></v-text-field>
                    </v-col>
                </v-row>
            </template>
        </div>
        <div class="text-center">
            <v-btn variant="flat" color="primary" append-icon="mdi-plus" class="mt-2 mb-6" text="Add checkbox" @click="addCheckbox" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const bugFormStore = useBugFormStore();
const { formStructure, currentRowIndex, currentColumnIndex } = storeToRefs(bugFormStore);
const { defaultCheckBox } = bugFormStore;

const field = computed(() => formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field);

const checkboxOptions = computed({
    get: () => formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field?.checkboxGroup || [{...defaultCheckBox()}],
    set: (newValue) => {
        if (formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field) {
            formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field!.checkboxGroup = newValue;
        }
    }
});

const addCheckbox = () => {
    const newOption = { id: `checkbox-${Date.now()}`, label: '', value: '' };
    checkboxOptions.value = [...checkboxOptions.value, newOption];
};

const deleteCheckbox = (index: number) => {
    const updatedOptions = [...checkboxOptions.value];
    updatedOptions.splice(index, 1);
    checkboxOptions.value = updatedOptions;
};

const checkBoxValue = () => {
    if (field.value!.checkboxMultiple) {
        field.value!.value = [];
    } else {
        field.value!.value = '';
    }
}

</script>