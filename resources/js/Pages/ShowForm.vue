<template>
    <div class="d-flex ma-4 justify-end">
        <v-btn :icon="theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'"
            @click="toggleTheme" class="border" />
    </div>
    <div style="max-width: 1000px;" class="mx-auto py-16">
        <FormView :formStructure="formStructure" :formTitle="formTitle" :settings="settings" :formId="formId" />
    </div>
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { Form, Settings } from '@/types';
import { storeToRefs } from 'pinia';
import FormView from '@/Form/Components/FormView.vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}

const props = defineProps<{
    form: Form
    settings: Settings
}>();

console.log(props.settings);

const bugStore = useBugFormStore();
const { formStructure, formTitle, formId, formSlug } = storeToRefs(bugStore);

formId.value = props.form.id;
formTitle.value = props.form.title;
formStructure.value = JSON.parse(props.form.form_structure as unknown as string);
formSlug.value = props.form.slug ?? '';


</script>