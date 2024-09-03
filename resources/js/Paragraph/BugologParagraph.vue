<template>
    <v-card color="surface-variant" variant="tonal" class="mb-4">
        <p v-if="field.paragraphHTML" v-html="field.paragraph" class="pa-2"/>
        <v-card-text v-else class="text-medium-emphasis text-caption">
            {{field.paragraph}}
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()

</script>