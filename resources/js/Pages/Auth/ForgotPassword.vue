<script setup lang="ts">
import Label from '@/Components/Label.vue';
import BugologLayout from '@/Layout/BugologLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

defineProps<{
    status?: string;
}>();

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <BugologLayout>
        <Head title="Forgot Password" />

        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset
            link that will allow you to choose a new one.
        </div>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
            {{ status }}
        </div>

        <v-form @submit.prevent="submit">
            <div>
                <Label for="email" :name="'Email'" />

                <v-text-field
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autofocus
                    autocomplete="username"
                />

                <!-- <InputError class="mt-2" :message="form.errors.email" /> -->
            </div>

            <div class="flex items-center justify-end mt-4">
                <v-btn :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Email Password Reset Link
                </v-btn>
            </div>
        </v-form>
    </BugologLayout>
</template>
