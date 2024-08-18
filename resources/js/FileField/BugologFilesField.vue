<template>
    <template v-if="field">
        <FormLabel :name="field.label" :required="field.required"/>
        <v-file-input :variant="'outlined'" :clearable="field.clearable" v-model="field.fileInput" :label="field.label" multiple/>
    </template>
</template>

<script lang="ts" setup>
import FormLabel from '@/Components/FormLabel.vue';
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()

</script>