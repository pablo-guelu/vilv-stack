<template>
    <v-container style="max-width: 1250px;">
        <v-card flat>
            <v-card-title class="text-h2">Bugolog</v-card-title>
        </v-card>
        <form @submit.prevent="data.post('/send')">         
            <v-container>
                <v-row>
                    <v-col>
                        <FormLabel :name="'Name'" required/>
                        <v-text-field variant="outlined" v-model="data.name" placeholder="John Doe"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <FormLabel :name="'Email'" required />
                        <v-text-field variant="outlined" v-model="data.email" placeholder="john.doe@example.com"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <FormLabel :name="'Product'" />
                        <v-text-field variant="outlined" v-model="data.product" placeholder="Product"></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mt-6 mb-8">
                    <div class="h-100 px-3">
                        <FormLabel :name="'Issue Description'" required/>
                        <div class="mt-4 mb-16" style="height: 300px;">
                            <QuillEditor theme="snow" toolbar="full" v-model:content="data.issueDescription" />
                        </div>
                    </div>
                </v-row>
                <v-row class="">
                    <v-col cols="12" md="6">
                        <FormLabel :name="'Attachments'"/>
                        <v-file-input variant="outlined" v-model="data.image" label="Attachments" prepend-icon=""
                            append-inner-icon="mdi-paperclip" multiple></v-file-input>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="d-flex justify-center justify-md-end">
                        <v-btn type="submit" color="primary" size="large">Submit</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </form>
    </v-container>
</template>

<script lang="ts" setup>
import { useForm } from '@inertiajs/vue3'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import FormLabel from '@/Components/FormLabel.vue'

const data = useForm({
    name: '',
    email: '',
    issueDescription: '',
    image: null,
    product: ''
});

</script>