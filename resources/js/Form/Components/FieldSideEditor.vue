<template>
    <div class="d-flex justify-center w-100">
        <v-card width="400px" class="py-8 px-2" rounded="lg">
            <v-card-title v-text="'Field Editor'" class="px-0 mb-8" />
            <v-form ref="fieldForm" fastfail>
                <v-text-field variant="outlined" density="compact" label="Label*" :rules="[requiredRule]"
                    v-model="defaultField.label" autofocus />
                <v-text-field v-if="needsPlaceHolder" variant="outlined" density="compact" label="Placeholder"
                    v-model="defaultField.placeholder" />
                <TextFieldSpecific v-if="sideFieldEditorType === FieldType.TEXT" />
                <SelectFieldSpecific v-if="sideFieldEditorType === FieldType.SELECT" />
                <RadioGroupFieldSpecific v-if="sideFieldEditorType === FieldType.RADIO" />
                <div class="d-flex">
                    <v-checkbox label="Required" v-model="defaultField.required" color="success"
                        class="me-6"></v-checkbox>
                    <v-checkbox label="Info Tooltip" v-model="defaultField.info" color="success"></v-checkbox>
                </div>

                <div v-if="defaultField.info">
                    <div class="text-h6 mb-2">Info Text</div>
                    <QuillEditor v-model:content="defaultField.infoString" content-type="html" />
                </div>

            </v-form>

            <div class="w-100 d-flex justify-center mt-10">
                <v-btn @click="saveForm" color="primary" class="mx-3" flat>Save</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import TextFieldSpecific from '@/TextField/TextFieldSpecific.vue';
import { FieldType } from '@/enums';
import SelectFieldSpecific from '@/SelectField/SelectFieldSpecific.vue';
import { QuillEditor } from '@vueup/vue-quill';
import RadioGroupFieldSpecific from '@/RadioField/RadioGroupFieldSpecific.vue';

const bugFormStore = useBugFormStore();
const { sideFieldEditorType, defaultField } = storeToRefs(bugFormStore);
const { requiredRule, saveForm } = bugFormStore;

const fieldForm = ref();

const noNeedsPlaceHolder = [FieldType.RADIO, FieldType.SELECT];

const needsPlaceHolder = computed(() => {
    return !noNeedsPlaceHolder.includes(sideFieldEditorType.value);
})

</script>