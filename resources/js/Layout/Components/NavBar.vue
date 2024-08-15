<template>
    <v-app-bar class="px-3" flat>
        
        <div class="d-flex justify-space-between align-center w-100">
            <div class="text-h2">Bugolog</div>
            <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
        </div>
    </v-app-bar>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify';

const theme = useTheme()
const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>