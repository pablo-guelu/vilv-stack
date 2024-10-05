<template>
    <v-date-input v-if="field" v-model="field.value" :label="field.label" :variant="field.variant"
        :density="field.density" :multiple="field.date?.multiple ? true : (field.date?.range ? 'range' : false)"
        prepend-icon="" prepend-inner-icon="$calendar" />
</template>

<script lang="ts" setup>
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()

</script>