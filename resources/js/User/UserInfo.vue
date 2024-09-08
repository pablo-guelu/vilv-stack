<template>

    <v-card class="pa-6 mx-auto mt-8 w-100" style="box-sizing: border-box;" flat>
        <v-card-title class="text-h5 mb-6">Project Info</v-card-title>
        <v-card-text class="">
            <v-form @submit.prevent="">
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="user.name" label="Name" required variant="outlined" density="compact"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="user.email" label="Email" required variant="outlined" density="compact"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="user.company_name" label="Company Name" required
                            variant="outlined" density="compact"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="user.company_website" label="Company Website" required
                            variant="outlined" density="compact"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-file-input v-model="user.company_logo" variant="outlined" label="Company Logo"
                            accept="image/*" prepend-icon="mdi-camera" density="compact"></v-file-input>
                    </v-col>
                </v-row>

                <v-btn type="submit" color="primary" class="mt-10 w-100">
                    Update Information
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>

</template>

<script lang="ts" setup>
import { useUserStore } from '@/Stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

</script>