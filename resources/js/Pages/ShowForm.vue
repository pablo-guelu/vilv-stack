<template>
    <div style="max-width: 1000px;" class="mx-auto py-16">

        <FormView :formStructure="formStructure" :formTitle="formTitle" />



    </div>
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { Form } from '@/types';
import { storeToRefs } from 'pinia';
import FormView from '@/Form/Components/FormView.vue';  
const props = defineProps<{
    form: Form
}>();

const bugStore = useBugFormStore();
const { formStructure, formTitle, formId, formSlug } = storeToRefs(bugStore);

formId.value = props.form.id;
formTitle.value = props.form.title;
formStructure.value = JSON.parse(props.form.form_structure as unknown as string);
formSlug.value = props.form.slug ?? '';
</script>