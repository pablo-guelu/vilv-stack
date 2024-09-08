<template>
    <div class="d-flex align-center mb-2">
        <div class="text-h5 me-1">{{ name }}</div>
        <v-tooltip v-if="info" density="compact" variant="tonal" icon="mdi-information-outline"
            class="text-disabled pa-0" close-delay="1000" :disabled="infoString?.trim() === '<p><br></p>'">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" class="pa-0" variant="plain" density="compact"
                    :icon="'mdi-information-outline'" />
            </template>
            <div v-html="infoString" />
        </v-tooltip>
    </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
    name: string,
    info?: boolean,
    infoString?: string
}>()

const showInfo = ref(false)
</script>

<style scoped></style>