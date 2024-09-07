<template>
    <template v-for="form, index in forms" :key="`form-${index}`">
        <v-card class="d-flex border rounded-lg ma-4 pa-2" style="box-sizing: border-box;">
            <v-card-title>{{ form.title }}</v-card-title>
            <div class="ms-auto">
                <v-btn @click="editForm(form.id)" icon="mdi-pencil" flat class="border mx-2" />
                <v-btn @click="deleteForm(form.id)" icon="mdi-delete" flat class="border mx-2" />
            </div>
        </v-card>
    </template>
</template>

<script lang="ts" setup>
import { Form } from '@/types';
import { router } from '@inertiajs/vue3'

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