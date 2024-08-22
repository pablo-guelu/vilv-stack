<template>
    <template v-if="field">
        <FormLabel :name="field.label" :required="field.required"/>
        <v-textarea :variant="field.variant" v-model="field.value" :placeholder="field.placeholder"/>
    </template>
</template>

<script lang="ts" setup>
import FormLabel from '@/Components/FormLabel.vue';
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()

</script>