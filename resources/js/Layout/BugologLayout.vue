<template>
    <v-app>
        <div class="d-flex flex-column h-100">
            <NavBar />
            <v-main class="flex-shrink-0">
                <slot name="main"></slot>
            </v-main>
        </div>
    </v-app>
</template>

<script lang="ts" setup>
import NavBar from './Components/NavBar.vue';

</script>