<template>
    <template v-if="field">
        <div class="d-flex flex-wrap">
            <v-checkbox v-for="checkbox in field.checkboxGroup"  v-model="field.value" :label="checkbox.label"
                :value="checkbox.value" :key="checkbox.id" class="me-6" :hint="field.hint" :persistent-hint="field.persistentHint" :class="field.customAttributes?.class ? field.customAttributes.class : ''":name="field.customAttributes?.name ? field.customAttributes.name : ''"></v-checkbox>
        </div>
    </template>
</template>

<script lang="ts" setup>
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()

</script>