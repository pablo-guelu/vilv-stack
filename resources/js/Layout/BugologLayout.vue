<template>
    <v-app>

        <AppBar />

        <v-main class="flex-shrink-0 h-100" style="box-sizing: border-box;">
            <v-snackbar v-model="errorSnackBar" location="top" variant="tonal" color="warning">
                

                <p v-for="error in AppErrors" :key="error">{{ error }}</p>

                <template v-slot:actions>
                    <v-btn variant="text" @click="errorSnackBar = false" icon="mdi-close" />
                </template>
            </v-snackbar>

            <slot name="main"></slot>

        </v-main>

    </v-app>
</template>

<script setup lang="ts">
import AppBar from '@/LandingPage/components/app/AppBar.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { errorSnackBar, AppErrors } = storeToRefs(bugFormStore);

</script>
