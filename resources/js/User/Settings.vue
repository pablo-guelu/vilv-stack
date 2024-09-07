<template>
    <v-card class="pa-6 border rounded-lg mx-auto my-4 w-100" flat>
        <v-card-title class="text-h4 mb-6">Settings</v-card-title>
        <v-card-text class="">
            <v-form @submit.prevent="">
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="user.redirect_url" label="Redirect URL" required variant="outlined"></v-text-field>
                    </v-col>
                    <v-col>
                        <Label name="Message after Submmition" />
                        <div>
                            <QuillEditor v-model:content="user.afterSubmittingMessage" content-type="html" />
                        </div>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-text-field v-model="user.recepients" label="Recipients" required variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-btn type="submit" color="primary" class="mt-10 w-100">
                    Update Settings
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>

</template>

<script lang="ts" setup>
import Label from '@/Components/Label.vue';
import { useUserStore } from '@/Stores/user';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

</script>

<style>
.ql-container {
    height: calc(100% - 92px);
    min-height: 200px;
    max-height: 400px;
}
</style>