<template>
    <template v-if="field">
        <FormLabel :field="field" />
        <v-textarea :variant="field.variant"  :density="field.density" v-model="field.value" :placeholder="field.placeholder" :hint="field.hint" :persistent-hint="field.persistentHint" :class="field.customAttributes?.class ? field.customAttributes.class : ''":name="field.customAttributes?.name ? field.customAttributes.name : ''" />
    </template>
</template>

<script lang="ts" setup>
import FormLabel from '@/Components/FormLabel.vue';
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()

</script>