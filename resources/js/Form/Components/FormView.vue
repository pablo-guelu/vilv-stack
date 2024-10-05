<template>
    <v-card class="py-8 my-4" border :theme="formStructure.defaultTheme">
        <v-row>
            <v-col cols="12">
                <!-- FORM TITLE -->
                <div v-if="formStructure.showTitle" class="d-flex justify-start align-center ms-6 mb-6">
                    <div class="text-h4 me-1">{{ formTitle }}</div>
                </div>
            </v-col>
        </v-row>
        <v-sheet v-if="formStructure.rows.length > 0" id="form_canvas">
            <template v-for="row, rowIndex in formStructure.rows" :key="`row-${rowIndex}`">
                <RowPreviewFrame :row="row" />
            </template>
        </v-sheet>

        <div class="d-flex justify-center">
            <v-btn color="primary" size="large" class="mt-8" :disabled="route().current('form.create')" @click="submitForm">Submit</v-btn>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import RowPreviewFrame from '@/Row/RowPreviewFrame.vue';
import { FormStructure, Settings } from '@/types';
import { router } from '@inertiajs/vue3'
import { useBugFormStore } from '@/Stores/bugForm';
import { computed } from 'vue';

const props = defineProps<{
    formStructure: FormStructure,
    formTitle?: string,
    settings?: Settings,
    formId?: string
}>();

const data = computed(() => useBugFormStore().parseFormStructureData(props.formStructure))
console.log(data.value);

const submitForm = () => {
    router.post('/send', {
        data: data.value,
        form_id: props.formId
    })
}
</script>
