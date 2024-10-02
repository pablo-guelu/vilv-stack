<template>
    <template v-if="field">
        <v-radio-group v-model="field.value" :label="field.label" :class="field.customAttributes?.class ? field.customAttributes.class : ''":name="field.name ? field.name : ''" :value="field.value">
            <template v-for="radio in field.radioGroup" :key="radio.id">
                <v-radio :label="radio.label" :value="radio.value"></v-radio>
            </template>
        </v-radio-group>
    </template>
</template>

<script lang="ts" setup>
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()

</script>