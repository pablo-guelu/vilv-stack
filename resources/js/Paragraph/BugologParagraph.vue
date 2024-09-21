<template>
    <v-sheet>
        <p v-if="field.paragraphHTML" v-html="field.paragraph" class="pa-2"/>
        <p v-else class="text-medium-emphasis text-caption">
            {{field.paragraph}}
        </p>
    </v-sheet>
</template>

<script lang="ts" setup>
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()

</script>