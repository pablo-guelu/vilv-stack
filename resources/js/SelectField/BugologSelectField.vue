<template>
    <template v-if="field">
        <FormLabel :field="field" />
        <v-select :variant="field.variant"  :density="field.density" v-model="field.value" :clearable="field.clearable" :multiple="field.multiple"
            :placeholder="field.placeholder" :type="field.inputType" :items="field.items" :hint="field.hint" :persistent-hint="field.persistentHint" :class="field.customAttributes?.class ? field.customAttributes.class : ''":name="field.customAttributes?.name ? field.customAttributes.name : ''" ></v-select>
    </template>
</template>

<script lang="ts" setup>
import FormLabel from '@/Components/FormLabel.vue';
import { BugologField } from '@/types';

const props = defineProps<{
    field: BugologField
}>()

</script>