<template>
    <template v-if="textField">
        <FormLabel :name="textField.label" :required="textField.required"/>
        <v-text-field variant="outlined" v-model="textField.value" :placeholder="textField.placeholder"
            :type="textField.inputType"></v-text-field>
    </template>
</template>

<script lang="ts" setup>
import FormLabel from '@/Components/FormLabel.vue';
import { TextField } from '@/types';

const props = defineProps<{
    textField: TextField
}>()


</script>