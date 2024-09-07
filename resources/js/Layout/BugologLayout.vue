<template>
    <v-app>

        <AppBar />

        <v-main class="flex-shrink-0 h-100" style="box-sizing: border-box;">

            <slot name="main"></slot>

        </v-main>

    </v-app>
</template>

<script lang="ts" setup>
import AppBar from '@/LandingPage/components/app/AppBar.vue';
</script>
