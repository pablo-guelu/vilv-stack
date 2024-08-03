<template>
    <v-container>
        <v-card flat>
            <v-card-title class="text-h2">Bugolog</v-card-title>
        </v-card>
        <v-form @submit="submitForm">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field variant="outlined" v-model="name" label="Name"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="8">
                        <v-text-field variant="outlined" v-model="email" label="Email"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea variant="outlined" v-model="issueDescription" label="Issue Description"></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-file-input variant="outlined" v-model="image" label="Image"></v-file-input>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-btn type="submit" color="primary">Submit</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const data = ref({
    name: '',
    email: '',
    issueDescription: '',
    image: null,
});
</script>