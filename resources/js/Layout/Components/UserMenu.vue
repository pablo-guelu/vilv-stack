<template>
    <v-menu v-model="show" location="bottom end" origin="top end" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn icon class="ms-2 border-md" size="46" v-bind="props">
                <div v-if="isUserAuth" >{{ user.name!.charAt(0) }}</div>
                <v-icon v-else icon="mdi-account" /> 
            </v-btn>
        </template>
        <v-card class="mt-1 pa-6" style="border-radius:12px">
            <div v-if="isUserAuth">
                <h3 class="text-body-1">
                    {{
                        user.name }}</h3>
                <p class="text-caption mt-1 font-weight-medium">
                    {{ user.email }}
                </p>
                <v-divider class="my-3 mx-3" color="blue-grey-lighten-3"></v-divider>
            </div>
            <v-row>
                <!-- <v-btn class="my-1 text-error" variant="text" prepend-icon="mdi-logout" @click="" text="logout" /> -->
                <div v-if="isUserAuth" class="d-flex flex-column">
                    <v-btn class="ma-2" prepend-icon="mdi-view-dashboard" color="primary" variant="tonal" @click="() => router.get('/form')" text="Dashboard"/>
                    <v-btn class="mt-8" variant="tonal" @click="logout" text="logout"/>
                    
                </div>
                <div v-else class="d-flex flex-column">
                    <v-btn  class="ma-2" color="primary" variant="tonal" @click="() => router.get('/login')" text="Login"/>
                    <v-btn class="ma-2" color="primary" variant="tonal" @click="() => router.get('/register')" text="Register"/>
                </div>
            </v-row>
        </v-card>
    </v-menu>

</template>

<script lang="ts" setup>
import { useUserStore } from '@/Stores/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';


const show = ref(false);
const userStore = useUserStore();
const { user, isUserAuth } = storeToRefs(userStore);
const { logout } = userStore;

</script>