<template>
    <div v-if="field" class="d-flex align-center">
        <template v-if="isTextField">
            <BugologTextField :field="(field as BugologField)" />
        </template>
        <template v-if="isHTMLField">
            <BugologHTMLEditor :field="(field as BugologField)" />
        </template>
        <template v-if="isSelectField">
            <BugologSelectField :field="(field as BugologField)" />
        </template>
        <template v-if="isFilesField">
            <BugologFilesField :field="(field as BugologField)" />
        </template>
        <template v-if="isTextAreaField">
            <BugologTextArea :field="(field as BugologField)" />
        </template>
        <template v-if="isRadioField">
            <BugologRadioField :field="(field as BugologField)" />
        </template>
        <template v-if="isCheckboxField">
            <BugologCheckboxField :field="(field as BugologField)" />
        </template>
        <template v-if="isParagraphField">
            <BugologParagraph :field="(field as BugologField)" />
        </template>
        <v-tooltip v-if="field.info" density="compact" variant="tonal" icon="mdi-information-outline"
            class="text-disabled pa-0" close-delay="1000" :disabled="field.infoString?.trim() === '<p><br></p>'">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" class="mb-4 ms-1" variant="plain" density="compact"
                    :icon="'mdi-information-outline'" />
            </template>
            <div v-html="field.infoString" />
        </v-tooltip>
    </div>
    <BugologImage v-if="isImageField" :img="field.image" />
</template>

<script lang="ts" setup>
import BugologCheckboxField from '@/Checkbox/BugologCheckboxField.vue';
import { FieldType } from '@/enums';
import BugologFilesField from '@/FileField/BugologFilesField.vue';
import BugologHTMLEditor from '@/HTMLEditor/BugologHTMLEditor.vue';
import BugologRadioField from '@/RadioField/BugologRadioField.vue';
import BugologSelectField from '@/SelectField/BugologSelectField.vue';
import BugologTextArea from '@/TextAreaField/BugologTextArea.vue';
import BugologTextField from '@/TextField/BugologTextField.vue';
import BugologParagraph from '@/Paragraph/BugologParagraph.vue';
import { BugologField } from '@/types';
import { computed } from 'vue';
import BugologImage from '@/Image/BugologImage.vue';

const props = defineProps<{
    field: BugologField,
}>()

const isTextField = computed(() => props.field.type === FieldType.TEXT);
const isHTMLField = computed(() => props.field.type === FieldType.HTML);
const isSelectField = computed(() => props.field.type === FieldType.SELECT);
const isFilesField = computed(() => props.field.type === FieldType.FILES);
const isTextAreaField = computed(() => props.field.type === FieldType.TEXT_AREA);
const isRadioField = computed(() => props.field.type === FieldType.RADIO);
const isCheckboxField = computed(() => props.field.type === FieldType.CHECKBOX);
const isParagraphField = computed(() => props.field.type === FieldType.PARAGRAPH);
const isImageField = computed(() => props.field.type === FieldType.IMAGE);
</script>