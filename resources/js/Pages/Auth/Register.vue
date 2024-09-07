<template>
    <Head title="Register" />
    <BugologLayout>
        <template v-slot:main>
            <v-sheet class="d-flex justify-center h-100">
                <v-card width="600" height="700" class="pa-4 mt-16 rounded-lg border" flat>
                    <v-form @submit.prevent="submit">
                        <div>
                            <Label name="Name" />
                            <v-text-field id="name" variant="outlined" type="text" class="mt-1" v-model="form.name" required autofocus
                                autocomplete="name" />
                        </div>
                        <div class="mt-4">
                            <Label name="Email" />
                            <v-text-field id="email" variant="outlined" type="email" class="mt-1" v-model="form.email" required
                                autocomplete="username" />
                        </div>
                        <div class="mt-4">
                            <Label name="Password" />
                            <v-text-field id="password" variant="outlined" type="password" class="mt-1" v-model="form.password" required
                                autocomplete="current-password" />
                        </div>
                        <div class="mt-4">
                            <Label name="Confirm Password" />
                            <v-text-field id="password_confirmation" variant="outlined" type="password" class="mt-1"
                                v-model="form.password_confirmation" required autocomplete="new-password" />
                        </div>
                        <div class="d-flex flex-column align-center mt-4">
                            <div style="width: 50%;">
                                <v-btn variant="tonal" append-icon="mdi-account-plus" block color="primary" text="Register"
                                    type="submit" />
                            </div>
                            <div class="ps-2 my-8 d-flex w-100 justify-start">
                                <Link :href="route('login')"
                                    class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                                Already registered?
                                </Link>
                            </div>
                            
                        </div>
                    </v-form>
                </v-card>
            </v-sheet>
        </template>
    </BugologLayout>
</template>

<script setup lang="ts">
import Label from '@/Components/Label.vue';
import BugologLayout from '@/Layout/BugologLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => {
            form.reset('password', 'password_confirmation');
        },
    });
};
</script>