<template>
    <v-app>
        <NavBar />
        <v-main>
            <slot name="main"></slot>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/Stores/user';
import NavBar from './Components/NavBar.vue';
import { storeToRefs } from 'pinia';
import { User } from '@/types';

</script>