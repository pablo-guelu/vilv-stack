<template>
    <div class="d-flex justify-center w-100">
        <v-card width="400px" class="py-8 px-2" rounded="lg">
            <!-- <v-card-title v-text="`Field Editor - ${field!.type}`" class="px-0 mb-8" /> -->
            <v-form ref="fieldForm" fastfail>
                <div v-if="sideFieldEditorType !== FieldType.PARAGRAPH">
                    <v-text-field variant="outlined" density="compact" label="Label*" :rules="[requiredRule]"
                        v-model="field!.label" autofocus />
                    <v-text-field v-if="needsPlaceHolder" variant="outlined" density="compact" label="Placeholder"
                        v-model="field!.placeholder" />
                    <TextFieldSpecific v-if="sideFieldEditorType === FieldType.TEXT" v-model:inputType="field!.inputType" />
                    <SelectFieldSpecific v-if="sideFieldEditorType === FieldType.SELECT" />
                    <RadioGroupFieldSpecific v-if="sideFieldEditorType === FieldType.RADIO" />
                    <!-- <CheckboxSpecific v-if="sideFieldEditorType === FieldType.CHECKBOX" /> -->
                    <div class="d-flex">
                        <v-checkbox label="Required" v-model="field!.required" color="success"
                            class="me-6"></v-checkbox>
                        <v-checkbox label="Info Tooltip" v-model="field!.info" color="success"></v-checkbox>
                    </div>
                    <div v-if="field!.info">
                        <div class="text-h6 mb-2">Info Tooltip</div>
                        <QuillEditor v-model:content="field!.infoString" content-type="html" />
                    </div>
                </div>
                <div v-else>
                    <ParagraphFieldSpecific />
                </div>

            </v-form>

            <div class="w-100 d-flex justify-center mt-10">
                <v-btn @click="saveForm" color="primary" class="mx-3" flat block append-icon="mdi-content-save" >Save</v-btn>
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
import CheckboxSpecific from '@/Checkbox/CheckboxSpecific.vue';
import ParagraphFieldSpecific from '@/Paragraph/ParagraphFieldSpecific.vue';

const bugFormStore = useBugFormStore();
const { sideFieldEditorType, formStructure, currentRowIndex, currentColumnIndex } = storeToRefs(bugFormStore);
const { requiredRule, saveForm } = bugFormStore;

const field = computed(() => {
    return formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field;
})


const fieldForm = ref();

const noNeedsPlaceHolder = [FieldType.RADIO, FieldType.SELECT, FieldType.CHECKBOX, FieldType.PARAGRAPH];

const needsPlaceHolder = computed(() => {
    return !noNeedsPlaceHolder.includes(sideFieldEditorType.value);
})

</script>