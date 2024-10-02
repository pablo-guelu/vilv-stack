<template>
    <template v-if="field">
        <v-number-input v-model.number="field.value as number | null | undefined" :label="field.label"
            :name="field.name" :type="field.type" :variant="field.variant" :density="field.density" :hint="field.hint" :persistent-hint="field.persistentHint" :placeholder="field.placeholder" :class="field.customAttributes?.class ? field.customAttributes.class : ''" />
    </template>
</template>

<script lang="ts" setup>
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField;
}>();
</script>