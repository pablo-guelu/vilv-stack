<template>
    <div>
        <p class="text-body-1 mb-4">Radio Group Options:</p>
        <div>
            <template v-for="(option, index) in radioGroupOptions" :key="option.id">
                <v-row no-gutters>
                    <v-col cols="1">
                        <v-btn class="pt-2" icon="mdi-delete" variant="plain" density="compact" @click="deleteOption(index)"></v-btn>
                    </v-col>
                    <v-col>
                        <v-text-field class="pe-2" label="label" v-model="option.label" variant="outlined" density="compact" @input="updateOption(index, 'label', $event.target.value)"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field class="ps-2" label="value" v-model="option.value" variant="outlined" density="compact" @input="updateOption(index, 'value', $event.target.value)"></v-text-field>
                    </v-col>
                </v-row>
            </template>
        </div>
        <v-btn variant="flat" color="primary" append-icon="mdi-plus" class="mt-2 mb-6" text="Add Option" @click="addOption" />
    </div>
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const bugFormStore = useBugFormStore();
const { formStructure, currentRowIndex, currentColumnIndex } = storeToRefs(bugFormStore);
const { defaultRadioOption } = bugFormStore;

const radioGroupOptions = computed({
    get: () => formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field?.radioGroup || [{...defaultRadioOption()}],
    set: (newValue) => {
        if (formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field) {
            formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field!.radioGroup = newValue;
        }
    }
});

const addOption = () => {
    const newOption = { id: `radioGroup-${Date.now()}`, label: '', value: '' };
    radioGroupOptions.value = [...radioGroupOptions.value, newOption];
};

const deleteOption = (index: number) => {
    const updatedOptions = [...radioGroupOptions.value];
    updatedOptions.splice(index, 1);
    radioGroupOptions.value = updatedOptions;
};

const updateOption = (index: number, key: 'label' | 'value', value: string) => {
    const updatedOptions = [...radioGroupOptions.value];
    updatedOptions[index][key] = value;
    radioGroupOptions.value = updatedOptions;
};
</script>