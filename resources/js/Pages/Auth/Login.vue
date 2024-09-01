<template>
    <v-sheet class="d-flex justify-center align-center h-100">

        <Head title="Log in" />

        <v-card max-width="600" class="pa-4" rounded="lg"   >
            <v-form @submit.prevent="submit">
                <div>
                    <Label name="Email" />
                    <v-text-field id="email" type="email" class="mt-1" v-model="form.email" required autofocus
                        autocomplete="username" />
                </div>
                <div class="mt-4">
                    <Label name="Password" />
                    <v-text-field id="password" type="password" class="mt-1" v-model="form.password" required
                        autocomplete="current-password" />
                </div>
                <div class="block mt-4">
                    <label class="d-flex">
                        <v-checkbox label="Remember" v-model:checked="form.remember" />
                    </label>
                </div>
                <div class="d-flex justify-end mt-4">
                    <Link v-if="canResetPassword" :href="route('password.request')"
                        class="">
                    Forgot your password?
                    </Link>
                    <v-btn variant="outlined" class="ms-4" color="primary" text="Log In" type="submit" />
                </div>
            </v-form>
        </v-card>
    </v-sheet>
</template>

<script setup lang="ts">
import Label from '@/Components/Label.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps<{
    canResetPassword?: boolean;
    status?: string;
}>();

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => {
            form.reset('password');
        },
    });
};
</script>
