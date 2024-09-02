<template>
    <v-dialog>
        <div class="d-flex justify-center w-100">
            <v-card :min-width="mdAndUp ? 600 : 300" max-width="600px" class="pa-8" rounded="lg">
                <v-form ref="fieldForm" fastfail>
                    <v-text-field variant="outlined" density="compact" label="Label*" :rules="[requiredRule]"
                        v-model="defaultField.label" />
                    <v-text-field variant="outlined" density="compact" label="Placeholder"
                        v-model="defaultField.placeholder" />
                    <TextFieldSpecific v-if="sideFieldEditorType === FieldType.TEXT " />
                    <SelectFieldSpecific v-if="sideFieldEditorType === FieldType.SELECT" />
                    <v-switch label="required" color="success" v-model="defaultField.required"></v-switch>
                </v-form>

                <v-card-actions class="d-flex justify-center">
                    <v-btn variant="tonal" v-on="{'click': editFieldMode ? fieldUpdate : createField}" color="success" class="mx-3">{{ editFieldMode ? 'Update' : 'Add' }}</v-btn>
                    <v-btn variant="tonal" color="error" class="mx-3">Cancel</v-btn>
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
import SelectFieldSpecific from '@/SelectField/SelectFieldSpecific.vue';

import { useDisplay } from 'vuetify';
const { mdAndUp } = useDisplay();

const bugFormStore = useBugFormStore();
const { sideFieldEditorType, defaultField, editFieldMode } = storeToRefs(bugFormStore);
const { addField, requiredRule, updateField, resetFieldData } = bugFormStore;

const fieldForm = ref();

const createField = async () => {
    const { valid } = await fieldForm.value.validate();
    if (valid) {
        addField(defaultField.value);
        resetFieldData();
    } else {
        return
    }
}

const fieldUpdate = async () => {
    const { valid } = await fieldForm.value.validate();
    if (valid) {
        updateField(defaultField.value);
        resetFieldData();
        editFieldMode.value = false;
    } else {
        return
    }
}   

</script>
