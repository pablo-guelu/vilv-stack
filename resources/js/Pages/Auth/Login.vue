<template>

    <Head title="Log in" />
    <BugologLayout>
        <template v-slot:main>
            <v-sheet class="d-flex justify-center h-100">

                <v-card width="600" height="700" class="pa-4 mt-16 rounded-lg border" flat>
                    <v-form @submit.prevent="submit" class="d-flex flex-column h-100">
                        <div>
                            <Label name="Email" />
                            <v-text-field id="email" variant="outlined" type="email" class="mt-1" v-model="form.email"
                                required autofocus autocomplete="username" />
                        </div>
                        <div class="mt-4">
                            <Label name="Password" />
                            <v-text-field id="password" variant="outlined" type="password" class="mt-1"
                                v-model="form.password" required autocomplete="current-password" />
                        </div>
                        <div class="block mt-4">
                            <label class="d-flex">
                                <v-checkbox label="Remember" v-model:checked="form.remember" />
                            </label>
                        </div>
                        <div class="d-flex flex-column align-center mt-auto">
                            <div style="width: 50%;">
                                <v-btn variant="tonal" append-icon="mdi-login" block color="primary" text="Log In"
                                    type="submit" />
                            </div>
                            <div class="d-flex flex-column flex-md-row justify-space-between my-12 w-100">
                                <Link v-if="canResetPassword" :href="route('password.request')" class="mb-4">
                                Forgot your password?
                                </Link>
                                <Link :href="route('register')" class="">
                                Don't have an account?
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
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';

defineProps<{
    canResetPassword?: boolean;
    status?: string;
}>();

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const bugFormStore = useBugFormStore();
const { AppErrors, errorSnackBar } = storeToRefs(bugFormStore);

const submit = () => {
    form.post(route('login'), {
        onFinish: () => {
            form.reset('password');
        },
        onError: (errors) => {
            errorSnackBar.value = true;
            AppErrors.value = Object.values(errors).flat();
            console.log(errors.value);
        }
    });
};
</script>
