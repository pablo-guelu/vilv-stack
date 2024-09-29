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

        <v-card-text class="mt-16 pa-0">
            <v-card v-for="form, index in forms" :key="`form-${index}`" style="box-sizing: border-box;"
                class="border rounded-lg my-4 pa-2 d-flex align-center">
                <div class="d-flex flex-column">
                    <v-card-title>{{ form.title }}</v-card-title>
                    <div v-if="form.slug !== '' || form.slug !== null" class="d-flex align-center">
                        <p class="text-body-2 text-grey-darken-1 font-italic ps-4">{{ `https://bugolog.com/${form.slug}`
                            }}</p>
                        <v-btn icon="mdi-content-copy" flat class="border mx-2" size="x-small"
                            @click="copyLink(form.slug)" />
                        <v-btn icon="mdi-open-in-new" flat class="border" size="x-small" @click="goToForm(form.slug!)" />
                    </div>
                </div>
                <div class="ms-auto">
                    <v-btn @click="editForm(form.id)" icon="mdi-pencil" flat class="border mx-2" />
                    <v-btn @click="handleDeleteForm" icon="mdi-delete" flat class="border mx-2" />
                </div>

                <WarningDialog v-model="deleteFormDialog" :text="'Are you sure you want to delete this Form?'"
                    :warning-type="'info'" :action="() => deleteForm(form.id)" />
            </v-card>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { Form } from '@/types';
import { router } from '@inertiajs/vue3'
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import WarningDialog from './Components/WarningDialog.vue';
const bugFormStore = useBugFormStore();
const { deleteFormDialog } = storeToRefs(bugFormStore);

const props = defineProps<{
    forms?: Form[]
}>()

const editForm = (id: string) => {
    router.visit(`/form/${id}/edit`)
}

const deleteForm = (id: string) => {
    router.delete(`/form/${id}`)
    deleteFormDialog.value = false
}

const handleDeleteForm = () => {
    deleteFormDialog.value = true
}

const copyLink = (slug: string | undefined) => {
    if (slug) {
        navigator.clipboard.writeText(`https://bugolog.com/${slug}`)
    }
}

const goToForm = (slug: string) => {
    window.open(`/${slug}`, '_blank')
}
</script>