<script setup lang="ts">
import Label from '@/Components/Label.vue';
import BugologLayout from '@/Layout/BugologLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

const form = useForm({
    password: '',
});

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => {
            form.reset();
        },
    });
};
</script>

<template>

    <BugologLayout>
        <Head title="Confirm Password" />
        <div class="mb-4 text-caption">
            This is a secure area of the application. Please confirm your password before continuing.
        </div>
        <v-form @submit.prevent="submit">
            <div>
                <Label for="password" :name="'Password'" />
                <v-text-field id="password" type="password" class="mt-1 block w-full" v-model="form.password" required
                    autocomplete="current-password" autofocus />
                <InputError class="mt-2" :message="form.errors.password" />
            </div>
            <div class="flex justify-end mt-4">
                <v-btn class="ms-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Confirm
                </v-btn>
            </div>
        </v-form>
    </BugologLayout>
</template>
