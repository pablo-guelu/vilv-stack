<template>
    <template v-if="field">
        <FormLabel :name="field.label" :required="field.required"/>
        <v-text-field variant="outlined" v-model="field.value" :placeholder="field.placeholder"
            :type="field.inputType" ></v-text-field>
    </template>
</template>

<script lang="ts" setup>
import FormLabel from '@/Components/FormLabel.vue';
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()


</script>