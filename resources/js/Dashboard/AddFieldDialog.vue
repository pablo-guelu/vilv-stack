<template>
    <v-dialog v-model="addFieldDialog">
        <v-card rounded="large">
            <v-form ref="fieldForm" fastfail>
                <v-text-field variant="outlined" density="compact" label="Label*" :rules="rules"
                    v-model="fieldData.label" />
                <v-text-field variant="outlined" density="compact" label="Placeholder"
                    v-model="fieldData.placeholder" />
                <slot></slot>
                <v-switch label="required" color="success" v-model="fieldData.required"></v-switch>
            </v-form>
            <v-card-actions>
                <v-btn @click="createField" color="success">Add</v-btn>
                <v-btn @click="addFieldDialog = false" color="info">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import { BugologField, TextField } from '@/types';
import { FieldType } from '@/enums';

const props = defineProps<{
    type: FieldType.TEXT | FieldType.HTML
}>()

const bugFormStore = useBugFormStore();
const { addFieldDialog } = storeToRefs(bugFormStore);
const { addField } = bugFormStore;

const fieldForm = ref();

const createField = async () => {
    const {valid} = await fieldForm.value.validate();
    if (valid) {
        addField(fieldData.value);
        fieldForm.value.reset();
    }
    addFieldDialog.value = false;
}

const fieldData: Ref<BugologField | TextField> = ref({
    id: '',
    label: '',
    placeholder: '',
    required: false,
    value: '',
    type: props.type
})

const rules = [
    (value: string) => !!value || 'Required'
]

</script>
