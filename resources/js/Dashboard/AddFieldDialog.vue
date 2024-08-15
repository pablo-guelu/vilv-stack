<template>
    <v-dialog v-model="addFieldDialog">
        <div class="d-flex justify-center w-100">
            <v-card min-width="600px" class="pa-8" rounded="lg">

                <v-form ref="fieldForm" fastfail @submit.prevent="createField">
                    <v-text-field variant="outlined" density="compact" label="Label*" :rules="[requiredRule]"
                        v-model="defaultField.label" />
                    <v-text-field variant="outlined" density="compact" label="Placeholder"
                        v-model="defaultField.placeholder" />
                    <TextFieldSpecific v-if="addFieldDialogType === FieldType.TEXT " />
                    
                    <v-switch label="required" color="success" v-model="defaultField.required"></v-switch>
                </v-form>

                <v-card-actions class="d-flex justify-center">
                    <v-btn variant="tonal" @click="createField" color="success" class="mx-3">Add</v-btn>
                    <v-btn variant="tonal" @click="addFieldDialog = false" color="error" class="mx-3">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import TextFieldSpecific from '@/TextField/TextFieldSpecific.vue';
import { FieldType } from '@/enums';

const bugFormStore = useBugFormStore();
const { addFieldDialog, addFieldDialogType, defaultField } = storeToRefs(bugFormStore);
const { addField, requiredRule } = bugFormStore;

const fieldForm = ref();

const createField = async () => {
    const { valid } = await fieldForm.value.validate();
    if (valid) {
        addField(defaultField.value);
        fieldForm.value.reset();
        addFieldDialog.value = false;
    } else {
        return
    }
}

</script>
