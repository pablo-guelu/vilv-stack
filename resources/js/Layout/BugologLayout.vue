<template>
    <v-app>

        <AppBar />

        <v-main class="d-flex justify-center align-center flex-shrink-0 h-100 w-100" style="box-sizing: border-box;">
            <div class="h-100 w-100" style="max-width: 1800px;">

                <!-- ERROR ALERTS -->
                <v-snackbar v-model="errorSnackBar" location="top" variant="tonal" color="warning">
                    <p v-for="error in AppErrors" :key="error">{{ error }}</p>
                    <template v-slot:actions>
                        <v-btn variant="text" @click="closeErrorSnackBar" icon="mdi-close" />
                    </template>
                </v-snackbar>

                <!-- SUCCESS ALERTS -->
                <v-snackbar v-model="successSnackBar" location="top" variant="tonal" color="success">
                    <p v-for="success in AppSuccess" :key="success">{{ success }}</p>
                    <template v-slot:actions>
                        <v-btn variant="text" @click="closeSuccessSnackBar" icon="mdi-close" />
                    </template>
                </v-snackbar>

                <slot name="main"></slot>
            </div>

        </v-main>

    </v-app>
</template>

<script setup lang="ts">
import AppBar from '@/LandingPage/components/app/AppBar.vue';
import { useGlobalStore } from '@/Stores/global';
import { storeToRefs } from 'pinia';
import { usePage } from '@inertiajs/vue3';
import { watch } from 'vue';

const page = usePage();

const preferences = page.props.preferences;
const errors = page.props.errors;
const globalStore = useGlobalStore();
const { AppErrors, AppSuccess, errorSnackBar, successSnackBar } = storeToRefs(globalStore);

const closeErrorSnackBar = () => {
    errorSnackBar.value = false;
    AppErrors.value = [];
}

const closeSuccessSnackBar = () => {
    successSnackBar.value = false;
    AppSuccess.value = [];
}

watch(errors, (newErrors) => {
    AppErrors.value = Object.values(newErrors);
    errorSnackBar.value = true;
});
</script>
