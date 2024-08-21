<template>
    <v-menu v-model="show" location="bottom end" origin="top end" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn icon class="ms-2 text-white profile-icon" size="46" v-bind="props">
                <div v-if="isUserAuth" >{{ user.name.charAt(0) }}</div>
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
                <Link v-if="isUserAuth" class="ms-4" color="primary" as="button" href="/logout" method="post"> Logout </Link>
                <Link v-else class="ms-4" color="primary" as="button" href="/login"> Login </Link>
            </v-row>
        </v-card>
    </v-menu>

</template>

<script lang="ts" setup>
import { useUserStore } from '@/Stores/user';
import { Link } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';


const show = ref(false);
const userStore = useUserStore();
const { user, isUserAuth } = storeToRefs(userStore);

</script>