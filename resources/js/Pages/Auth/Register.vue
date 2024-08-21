<template>
    <v-sheet>

        <Head title="Register" />

        <form @submit.prevent="submit">
            <div>
                <FormLabel name="Name" />

                <v-text-field id="name" type="text" class="mt-1" v-model="form.name" required autofocus
                    autocomplete="name" />

            </div>

            <div class="mt-4">
                <FormLabel name="Email" />

                <v-text-field id="email" type="email" class="mt-1" v-model="form.email" required
                    autocomplete="username" />

            </div>

            <div class="mt-4">
                <FormLabel name="Password" />
                <v-text-field id="password" type="password" class="mt-1" v-model="form.password" required
                    autocomplete="current-password" />
            </div>

            <div class="mt-4">
                <FormLabel name="Confirm Password" />

                <v-text-field id="password_confirmation" type="password" class="mt-1"
                    v-model="form.password_confirmation" required autocomplete="new-password" />

            </div>

            <div class="d-flex justify-end mt-4">
                <Link :href="route('login')"
                    class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                Already registered?
                </Link>

                <v-btn class="ms-4" text="Register" type="submit" />

            </div>
        </form>
    </v-sheet>
</template>

<script setup lang="ts">
import FormLabel from '@/Components/FormLabel.vue';
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