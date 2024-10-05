<template>
    <v-date-input v-if="field" v-model="field.value" :label="field.label" :variant="field.variant" :density="field.density" :hint="field.hint" :persistent-hint="field.persistentHint" :name="field.name" :multiple="field.date?.multiple ? true : (field.date?.range ? 'range' : false)"
        prepend-icon="" prepend-inner-icon="$calendar" :placeholder="field.placeholder" />
</template>

<script lang="ts" setup>
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()

</script>