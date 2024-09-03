<template>
    <div>
        <v-switch v-model="defaultField.paragraphHTML" label="HTML Paragraph" color="primary"/>
        <QuillEditor v-if="defaultField.paragraphHTML" v-model:content="defaultField.paragraph" content-type="html" />
        <v-textarea v-else label="Info Text" v-model="defaultField.paragraph" variant="outlined" />
    </div>
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { QuillEditor } from '@vueup/vue-quill';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { defaultField } = storeToRefs(bugFormStore);

</script>