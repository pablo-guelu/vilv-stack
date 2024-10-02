<template>
        <v-card class="pa-2 border-thin rounded" variant="tonal">
            {{ field.result?.result }}
        </v-card>
</template>

<script lang="ts" setup>
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>();
</script>
