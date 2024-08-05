<template>
    <v-container style="max-width: 1250px;">
        <v-card flat>
            <v-card-title class="text-h2">Bugolog</v-card-title>
        </v-card>
        <form  @submit.prevent="data.post('/send')">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field variant="outlined" v-model="data.name" label="Name"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="8">
                        <v-text-field variant="outlined" v-model="data.email" label="Email"></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mb-6">
                    <v-col cols="12">
                        <div class="h-100">
                            <QuillEditor theme="snow" v-model="data.issueDescription"/>
                        </div>
                    </v-col>
                </v-row>
                <v-row class="mt-4">
                    <v-col cols="12">
                        <v-file-input variant="outlined" v-model="data.image" label="Attachments" prepend-icon="" append-inner-icon="mdi-paperclip" multiple></v-file-input>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-btn type="submit" color="primary">Submit</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </form>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { router, useForm } from '@inertiajs/vue3'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const data = useForm({
    name: '',
    email: '',
    issueDescription: '',
    image: null,
});

</script>