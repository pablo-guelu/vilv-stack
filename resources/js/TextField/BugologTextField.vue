<template>
    <template v-if="field">
        <v-text-field :variant="field.variant" :rules="rules" :label="field.label" :density="field.density" v-model="field.value" :placeholder="field.placeholder"
            :type="field.inputType" :hint="field.hint" :persistent-hint="field.persistentHint" :class="field.customAttributes?.class ? field.customAttributes.class : ''" :name="field.customAttributes?.name ? field.customAttributes.name : ''" ></v-text-field>
    </template>
</template>

<script lang="ts" setup>
import { BugologField } from '@/types';
import { computed } from 'vue';
import { useBugFormStore } from '@/Stores/bugForm';

const bugFormStore = useBugFormStore();
const { requiredRule } = bugFormStore;

const props = defineProps<{
    field: BugologField
}>()

const rules = computed(() => {
    const fieldRules = [];
    if (props.field.required) {
        fieldRules.push(requiredRule);
    }
    // Additional rules can be added here in the future
    // For example:
    // if (props.field.minLength) {
    //     fieldRules.push(v => v.length >= props.field.minLength || `Minimum length is ${props.field.minLength}`);
    // }
    return fieldRules.length > 0 ? fieldRules : undefined;
});





</script>   