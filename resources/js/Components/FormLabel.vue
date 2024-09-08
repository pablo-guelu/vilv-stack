<template>
    <div class="d-flex align-center w-100 my-2">
        <div class="text-h5 me-1">{{ field.label }}</div>
        <v-tooltip v-if="field.info" density="compact" variant="tonal" icon="mdi-information-outline" class="text-disabled pa-0" close-delay="1000" :disabled="field.infoString?.trim() === '<p><br></p>'" >
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" class="pa-0" variant="plain" density="compact"  :icon="'mdi-information-outline'" />
            </template>
            <div v-html="field.infoString" />
        </v-tooltip>
        <div v-if="field.required" class="ms-auto align-self-end text-subtitle-1 text-disabled font-italic">(required)
        </div>
    </div>

</template>

<script lang="ts" setup>
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()

</script>
