<template>
    <v-app>
        <NavBar />
        <v-main>
            <slot name="main"></slot>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
import NavBar from './Components/NavBar.vue';

</script>