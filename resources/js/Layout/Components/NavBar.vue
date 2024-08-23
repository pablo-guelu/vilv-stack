<template>
    <v-app-bar class="px-3 border-b-sm" flat>
        
        <div class="d-flex justify-space-between align-center w-100">
            <div class="text-h2">{{ user ? user.name : '' }} Bugolog</div>
            <div>
                <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
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

const theme = useTheme()
const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const userStore = useUserStore();
const {user} = storeToRefs(userStore);

</script>