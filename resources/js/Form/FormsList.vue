<template>
    <v-sheet>
        <div class="d-flex justify-end mb-10">
            <v-btn color="primary" variant="tonal" append-icon="mdi-plus" class="me-6" @click="bugFormStore.newForm">
                New Form
            </v-btn>
        </div>
        <v-card v-for="form, index in forms" :key="`form-${index}`" class="d-flex border rounded-lg ma-4 pa-2"
            style="box-sizing: border-box;">
            <v-card-title>{{ form.title }}</v-card-title>
            <div class="ms-auto">
                <v-btn @click="editForm(form.id)" icon="mdi-pencil" flat class="border mx-2" />
                <v-btn @click="deleteForm(form.id)" icon="mdi-delete" flat class="border mx-2" />
            </div>
        </v-card>
    </v-sheet>

</template>

<script lang="ts" setup>
import { Form } from '@/types';
import { router } from '@inertiajs/vue3'
import { useBugFormStore } from '@/Stores/bugForm';
const bugFormStore = useBugFormStore();

const props = defineProps<{
    forms?: Form[]
}>()

const editForm = (id: string) => {
    router.visit(`/form/${id}/edit`)
}

const deleteForm = (id: string) => {
    router.delete(`/form/${id}`)
}

</script>