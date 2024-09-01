<script setup lang="ts">
import Label from '@/Components/Label.vue';
import BugologLayout from '@/Layout/BugologLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

const props = defineProps<{
    email: string;
    token: string;
}>();

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('password.store'), {
        onFinish: () => {
            form.reset('password', 'password_confirmation');
        },
    });
};
</script>

<template>
    <BugologLayout>
        <Head title="Reset Password" />

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

                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="mt-4">
                <Label for="password" :name="'Password'" />

                <v-text-field
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="new-password"
                />

                <!-- <InputError class="mt-2" :message="form.errors.password" /> -->
            </div>

            <div class="mt-4">
                <Label for="password_confirmation" :name="'Confirm Password'" />

                <v-text-field
                    id="password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password"
                />

                <!-- <InputError class="mt-2" :message="form.errors.password_confirmation" /> -->
            </div>

            <div class="flex items-center justify-end mt-4">
                <v-btn :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Reset Password
                </v-btn>
            </div>
        </v-form>
    </BugologLayout>
</template>
