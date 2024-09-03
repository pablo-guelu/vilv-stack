<template>
    <div>
        <div class="mt-4">
            <v-checkbox v-model="defaultField.checkboxMultiple" v-on:update:model-value="checkBoxValue" label="Allow Select Multiple Checkboxes" />
        </div>
        <p class="text-body-1 mb-4">Checkbox Options:</p>
        <div>
            <template v-for="checkbox, index in defaultField.checkboxGroup" :key="checkbox.id">
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
        <v-btn variant="flat" color="primary" append-icon="mdi-plus" class="mt-2 mb-6" text="Add checkbox" @click="addCheckbox" />
    </div>
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';

const bugFormStore = useBugFormStore();
const { defaultField } = storeToRefs(bugFormStore);

const addCheckbox = (index: number) => {
    defaultField.value.checkboxGroup!.push({ id: `${defaultField.value.label}-checkbox-${index}`, label: '', value: '' });
}

const deleteCheckbox = (index: number) => {
    defaultField.value.radioGroup!.splice(index, 1);
}

const checkBoxValue = () => {
    if (defaultField.value.checkboxMultiple) {
        defaultField.value.value = [];
    } else {
        defaultField.value.value = '';
    }
}

</script>