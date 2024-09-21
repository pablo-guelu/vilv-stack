<template>
    <div class="mb-4">
        <v-switch v-model="field!.paragraphHTML" label="HTML Paragraph" color="primary" hide-details/>
        <QuillEditor v-if="field!.paragraphHTML" v-model:content="field!.paragraph" content-type="html" />
        <v-textarea v-else label="Info Text" v-model="field!.paragraph" variant="outlined" />
    </div>
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { QuillEditor } from '@vueup/vue-quill';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const bugFormStore = useBugFormStore();
const { formStructure, currentRowIndex, currentColumnIndex } = storeToRefs(bugFormStore);
const field = computed(() => formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field);

</script>