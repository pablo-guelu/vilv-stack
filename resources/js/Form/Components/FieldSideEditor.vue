<template>
    <div class="d-flex justify-center w-100">
        <v-card width="400px" class="py-8 px-2" rounded="lg" flat>
            <v-card-title v-text="`Field Editor - ${field!.type}`" class="px-0 mb-8" />
            <v-form ref="fieldForm" fastfail>

                <div v-if="sideFieldEditorType !== FieldType.IMAGE">
                    <v-text-field v-if="sideFieldEditorType !== FieldType.CHECKBOX" variant="outlined" density="compact"
                        label="Label" v-model="field!.label" autofocus />
                    <v-text-field v-if="needsPlaceHolder" variant="outlined" density="compact" label="Placeholder"
                        v-model="field!.placeholder" />
                    <TextFieldSpecific v-if="sideFieldEditorType === FieldType.TEXT" v-model:inputType="field!.inputType" />
                    <SelectFieldSpecific v-if="sideFieldEditorType === FieldType.SELECT" />
                    <RadioGroupFieldSpecific v-if="sideFieldEditorType === FieldType.RADIO" />
                    <CheckboxSpecific v-if="sideFieldEditorType === FieldType.CHECKBOX" />
                    <div class="d-flex">
                        <v-checkbox label="Required" v-model="field!.required" color="success" class="me-6"></v-checkbox>
                        <v-checkbox label="Info Tooltip" v-model="field!.info" color="success"></v-checkbox>
                    </div>
                    <div v-if="field!.info" class="mb-8">
                        <div class="text-h6 mb-2">Info Tooltip</div>
                        <QuillEditor v-model:content="field!.infoString" content-type="html" />
                    </div>
                    <div v-if="field!.type !== FieldType.RADIO && field!.type !== FieldType.HTML">
                        <v-text-field variant="outlined" density="compact" label="Hint" v-model="field!.hint" />
                        <v-checkbox label="Persistent Hint" v-model="field!.persistentHint" color="success" />
                    </div>
                    <div v-if="sideFieldEditorType == FieldType.PARAGRAPH">
                        <ParagraphFieldSpecific />
                    </div>
                </div>

                <ImageSpecific v-if="sideFieldEditorType === FieldType.IMAGE" />

                <div class="my-6 text-body-1 font-italic">Custom Styling</div>
                <!-- <v-text-field variant="outlined" density="compact" label="custom element class"
                    v-model="field!.customAttributes!.class" /> -->
                <!-- <v-text-field variant="outlined" density="compact" label="Custom input name"
                    v-model="field!.customAttributes!.name" /> -->

                <!-- MARGIN -->
                <div class="text-body-1 mb-4">Margin</div>
                <div class="d-flex w-100 flex-wrap">
                    <v-number-input :reverse="false" controlVariant="stacked" inset label="margin-top"
                        variant="outlined" density="compact" v-model="field!.customStyle!.marginTop"
                        class="w-50 pe-4 mb-2" />
                    <v-number-input :reverse="false" controlVariant="stacked" inset label="margin-bottom"
                        variant="outlined" density="compact" v-model="field!.customStyle!.marginBottom"
                        class="w-50 pe-4 mb-2" />
                    <v-number-input :reverse="false" controlVariant="stacked" inset label="margin-left"
                        variant="outlined" density="compact" v-model="field!.customStyle!.marginLeft"
                        class="w-50 pe-4 mb-2" />
                    <v-number-input :reverse="false" controlVariant="stacked" inset label="margin-right"
                        variant="outlined" density="compact" v-model="field!.customStyle!.marginRight"
                        class="w-50 pe-4 mb-2" />
                </div>

                <!-- PADDING -->
                <div class="text-body-1 mb-4">Padding</div>
                <div class="d-flex w-100 flex-wrap">
                    <v-number-input :reverse="false" controlVariant="stacked" inset label="padding-top"
                        variant="outlined" density="compact" v-model="field!.customStyle!.paddingTop"
                        class="w-50 pe-4 mb-2" />
                    <v-number-input :reverse="false" controlVariant="stacked" inset label="padding-bottom"
                        variant="outlined" density="compact" v-model="field!.customStyle!.paddingBottom"
                        class="w-50 pe-4 mb-2" />
                    <v-number-input :reverse="false" controlVariant="stacked" inset label="padding-left"
                        variant="outlined" density="compact" v-model="field!.customStyle!.paddingLeft"
                        class="w-50 pe-4 mb-2" />
                    <v-number-input :reverse="false" controlVariant="stacked" inset label="padding-right"
                        variant="outlined" density="compact" v-model="field!.customStyle!.paddingRight"
                        class="w-50 pe-4 mb-2" />
                </div>

            </v-form>

            <div class="w-100 d-flex justify-center mt-10">
                <v-btn @click="saveForm" color="primary" class="mx-3" flat block
                    append-icon="mdi-content-save">Save</v-btn>
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
import ImageSpecific from '@/Image/ImageSpecific.vue';

const bugFormStore = useBugFormStore();
const { sideFieldEditorType, formStructure, currentRowIndex, currentColumnIndex } = storeToRefs(bugFormStore);
const { saveForm } = bugFormStore;

const field = computed({
    get: () => formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field,
    set: (newValue) => {
        formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field = newValue;
    }
});

const fieldForm = ref();

const noNeedsPlaceHolder = [FieldType.RADIO, FieldType.SELECT, FieldType.CHECKBOX, FieldType.PARAGRAPH];

const needsPlaceHolder = computed(() => {
    return !noNeedsPlaceHolder.includes(sideFieldEditorType.value);
})

</script>