<template>
    <div v-if="field">
        <template v-if="isTextField" >
            <BugologTextField :field="(field as BugologField)" />
        </template>
        <template v-if="isHTMLField" >
            <BugologHTMLEditor :field="(field as BugologField)" />
        </template>
        <template v-if="isSelectField" >
            <BugologSelectField :field="(field as BugologField)" />
        </template>
    </div>
</template>

<script lang="ts" setup>
import { FieldType } from '@/enums';
import BugologHTMLEditor from '@/HTMLEditor/BugologHTMLEditor.vue';
import BugologSelectField from '@/Select/BugologSelectField.vue';
import BugologTextField from '@/TextField/BugologTextField.vue';
import { BugologField } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
    field: BugologField
}>()

const isTextField = computed(() => props.field.type === FieldType.TEXT);
const isHTMLField = computed(() => props.field.type === FieldType.HTML);
const isSelectField = computed(() => props.field.type === FieldType.SELECT);
</script>