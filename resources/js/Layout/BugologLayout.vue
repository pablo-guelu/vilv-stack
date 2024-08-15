<template>
    <v-app>
        <NavBar/>
        <v-main>
            <slot name="main"></slot>
        </v-main>
    </v-app>
</template>

<script setup>
import NavBar from './Components/NavBar.vue';

</script>