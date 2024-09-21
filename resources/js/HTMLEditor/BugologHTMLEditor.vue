<template>
    <template v-if="field">
        <v-sheet height="250px">
            <QuillEditor theme="snow" :toolbar="toolbarConfig" v-model:content="(field.value as string)" :placeholder="field.placeholder" content-type="html" :class="field.customAttributes?.class ? field.customAttributes.class : ''":name="field.customAttributes?.name ? field.customAttributes.name : ''" />
        </v-sheet>

    </template>
</template>

<script lang="ts" setup>
import { BugologField } from '@/types';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const { mdAndUp } = useDisplay()

const props = defineProps<{
    field: BugologField
}>()

const toolbarConfig = computed(() => mdAndUp ? 'essential' : 'minimal' )

</script>

<style>
.ql-container {
    height: calc(100% - 92px);
}
</style>