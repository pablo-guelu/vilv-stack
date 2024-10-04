<template>
        <v-card class="pa-2 border-thin rounded" variant="tonal">
            {{ props.field.result?.result() }}
        </v-card>
</template>

<script lang="ts" setup>
import { BugologField } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
    field: BugologField
}>();

const functionFromString = (functionString: string) => {
  return new Function('return ' + functionString)();
}

// const result  = computed(() => props.field.result?.result ?  : '');

</script>
