<template>
    <v-text-field v-if="field" v-model="field.value" :active="menu" :focus="menu" :label="field.label"
        prepend-icon="" prepend-inner-icon="mdi-clock-time-four-outline" readonly :variant="field.variant" :density="field.density" :hint="field.hint" :persistent-hint="field.persistentHint" :name="field.name" :placeholder="field.placeholder">
        <v-menu v-model="menu" :close-on-content-click="false" activator="parent" transition="scale-transition">
            <v-time-picker v-if="menu" v-model="field.value" full-width></v-time-picker>
        </v-menu>
    </v-text-field>
</template>

<script lang="ts" setup>
import { BugologField } from '@/types';
import { ref } from 'vue';

const menu = ref(false)

const props = defineProps<{
    field: BugologField
}>()
</script>