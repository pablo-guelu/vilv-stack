<template>
    <div class="d-flex justify-center w-100">
        <v-card width="400px" class="pa-8" rounded="lg">
            <v-card-title v-text="'Field Editor'" class="px-0 mb-3" />
            <v-form ref="fieldForm" fastfail>
                <v-text-field variant="outlined" density="compact" label="Label*" :rules="[requiredRule]"
                    v-model="defaultField.label" />
                <v-text-field variant="outlined" density="compact" label="Placeholder"
                    v-model="defaultField.placeholder" />
                <TextFieldSpecific v-if="sideFieldEditorType === FieldType.TEXT" />
                <SelectFieldSpecific v-if="sideFieldEditorType === FieldType.SELECT" />

                <v-switch label="required" color="success" v-model="defaultField.required"></v-switch>
            </v-form>

            <!-- <v-card-actions class="d-flex justify-center">
                <v-btn variant="tonal" @click="fieldUpdate" color="success"
                    class="mx-3">Save</v-btn>
                <v-btn variant="tonal" color="error" class="mx-3">Cancel</v-btn>
            </v-card-actions> -->
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import TextFieldSpecific from '@/TextField/TextFieldSpecific.vue';
import { FieldType } from '@/enums';
import SelectFieldSpecific from '@/SelectField/SelectFieldSpecific.vue';

const bugFormStore = useBugFormStore();
const { sideFieldEditorType, defaultField, editFieldMode } = storeToRefs(bugFormStore);
const { requiredRule, updateField } = bugFormStore;

const fieldForm = ref();

// const fieldUpdate = async () => {
//     const { valid } = await fieldForm.value.validate();
//     if (valid) {
//         updateField(defaultField.value);
//     } else {
//         return
//     }
// }

</script>