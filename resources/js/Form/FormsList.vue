<template>
    <v-list>
        <v-list-item-group>
            <v-list-item v-for="form, index in forms" :key="`form-${index}`" class="d-flex justify-space-between w-100" >

                <v-list-item-title v-text="form.title"></v-list-item-title>

                <v-list-item-action>
                    <v-btn @click="editForm(form.id)">Edit</v-btn>
                    <v-btn @click="deleteForm(form.id)">Delete</v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list-item-group>
    </v-list>
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