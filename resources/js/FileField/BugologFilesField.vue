<template>
    <template v-if="field">
        <FormLabel :field="field" />
        <v-file-input :variant="field.variant" :clearable="field.clearable" v-model="field.fileInput" :label="field.label" multiple :hint="field.hint" :persistent-hint="field.persistentHint" />
    </template>
</template>

<script lang="ts" setup>
import FormLabel from '@/Components/FormLabel.vue';
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()

</script>