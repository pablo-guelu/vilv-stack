<template>
    <div v-if="field">
        <template v-if="isTextField" >
            <BugologTextField :textField="(field as TextField)" />
        </template>
    </div>
</template>

<script lang="ts" setup>
import { FieldType } from '@/enums';
import BugologTextField from '@/TextField/BugologTextField.vue';
import { BugologField, TextField } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
    field: BugologField | TextField
}>()

const isTextField = computed(() => props.field.type === FieldType.TEXT);
</script>