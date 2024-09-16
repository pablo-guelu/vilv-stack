<template>


    <v-card class="pa-6 mx-auto mt-8 d-flex flex-column justify-center w-100" style="box-sizing: border-box;" flat>

        <v-card-title class="text-h5 mb-10 text-center">
            <div class="text-h5 mb-auto text-center">Project Info</div>
        </v-card-title>

        <div>
            <v-btn color="primary" variant="tonal" append-icon="mdi-plus" class="me-6" @click="bugFormStore.newForm">
                New Form
            </v-btn>
        </div>

        <v-card-text class="mt-10 pa-0">
            <v-card v-for="form, index in forms" :key="`form-${index}`" class="d-flex border rounded-lg my-4 pa-2"
                style="box-sizing: border-box;">
                <v-card-title>{{ form.title }}</v-card-title>
                <div class="ms-auto">
                    <v-btn @click="editForm(form.id)" icon="mdi-pencil" flat class="border mx-2" />
                    <v-btn @click="deleteForm(form.id)" icon="mdi-delete" flat class="border mx-2" />
                </div>
            </v-card>
        </v-card-text>
    </v-card>

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