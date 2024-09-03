<template>
    <v-card color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
            {{text}}
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

const props = defineProps<{
    text: string;
}>()

</script>