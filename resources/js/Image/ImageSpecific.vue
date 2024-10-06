<template>
    <v-file-input variant="outlined" density="compact" prepend-icon="" v-model="Img!.src" label="Source"
        @change="setImgPath">
        <template v-slot:append>
            <v-tooltip location="top"
                :text="formId !== '' ? 'Save Image' : 'Please add a title and save your form before uploading an image'">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" icon="mdi-content-save" variant="text" color="secondary" :disabled="!Img!.src"
                        @click="saveImage" />
                </template>
            </v-tooltip>
        </template>
    </v-file-input>
    <v-text-field v-model="Img!.alt" variant="outlined" density="compact" label="Alt" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import { router, useForm } from '@inertiajs/vue3';
import { useGlobalStore } from '@/Stores/global';
const bugFormStore = useBugFormStore()
const { formStructure, currentRowIndex, currentColumnIndex, formId, images } = storeToRefs(bugFormStore)

const globalStore = useGlobalStore();
const { AppErrors, AppSuccess, errorSnackBar, successSnackBar } = storeToRefs(globalStore);

const Img = computed(() => {
    return formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field!.image
})

const setImgPath = () => {
    console.log(`/storage/forms/${formId.value}/images/${(Img.value!.src as File).name}`)
    Img.value!.path = Img.value!.src ? `/storage/forms/${formId.value}/images/${(Img.value!.src as File).name}` : ''

    images.value.push(Img.value!)
    
}

const form = useForm({
    image: null,
    form_id: null,
})



const saveImage = () => {
    if (Img.value) {
        router.post('/save-image', {
            image: Img.value.src,
            form_id: formId.value,
            alt_text: Img.value.alt,

        },
            {
                onSuccess: (response) => {
                    AppSuccess.value = ['Image saved successfully'];
                    successSnackBar.value = true;
                },
                onError: (errors) => {
                    errorSnackBar.value = true;
                    AppErrors.value = Object.values(errors).flat() as string[];
                }
            })

        Img.value!.path = `/storage/forms/${formId.value}/images/${(Img.value.src as File).name}`
    }
}
</script>
