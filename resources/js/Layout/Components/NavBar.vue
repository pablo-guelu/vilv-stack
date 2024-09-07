<template>
    <v-app-bar class="border-b-sm" flat>
        
        <div class="d-flex justify-space-between align-center w-100 h-100 px-6">
            <div @click="router.visit('/form')" class="text-h3">Bugolog</div>
            <div>
                <v-btn :icon="theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'" @click="toggleTheme"></v-btn>
                <UserMenu />
            </div>
        </div>
    </v-app-bar>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/Stores/user';
import { storeToRefs } from 'pinia';
import { useTheme } from 'vuetify';
import UserMenu from './UserMenu.vue';
import {router } from '@inertiajs/vue3'

const theme = useTheme()
const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const userStore = useUserStore();
const {user} = storeToRefs(userStore);

</script>