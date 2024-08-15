<template>
    <v-card class="pa-3 my-6" variant="outlined" rounded="lg">
        <div class="d-flex">
            <FormLabel :name="title" />
            <v-btn @click="addAction" size="small" color="success" icon="mdi-plus"></v-btn>
        </div>
        <div>
            <slot></slot>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import FormLabel from './FormLabel.vue';

const props = defineProps<{
    title: string
    addAction: () => void
}>()
</script>