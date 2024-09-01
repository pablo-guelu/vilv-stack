<template>
    <template v-if="field">
        <FormLabel :field="field" />
        <v-text-field :variant="field.variant" v-model="field.value" :placeholder="field.placeholder"
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