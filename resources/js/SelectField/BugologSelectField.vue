<template>
    <template v-if="field">
        <FormLabel :name="field.label" :required="field.required" />
        <v-select variant="outlined" v-model="field.value" :clearable="field.clearable" :multiple="field.multiple"
            :placeholder="field.placeholder" :type="field.inputType" :items="field.items"></v-select>
    </template>
</template>

<script lang="ts" setup>
import FormLabel from '@/Components/FormLabel.vue';
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()

</script>