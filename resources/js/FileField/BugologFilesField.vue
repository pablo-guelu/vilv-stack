<template>
    <template v-if="field">
        <v-file-input :variant="field.variant" :label="field.label" :density="field.density" :clearable="field.clearable" v-model="field.fileInput" multiple :hint="field.hint" :persistent-hint="field.persistentHint" :class="field.customAttributes?.class ? field.customAttributes.class : ''":name="field.name ? field.name : ''" />
    </template>
</template>

<script lang="ts" setup>
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()

</script>