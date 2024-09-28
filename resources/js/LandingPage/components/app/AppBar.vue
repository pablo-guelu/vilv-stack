<template>
  <v-app-bar class="justify-space-between">
    <template #title>
      <div class="d-inline-flex align-center text-h4 font-weight-bold my-5 text-primary" @click="isUserAuth ? router.visit('/form') : router.visit('/')" style="cursor: pointer;">
        <v-icon icon="$vuetify" start />
        Bugolog
      </div>
    </template>

    <div v-if="route().current('landing')" class="hidden-sm-and-down flex-grow-1">
      <v-btn v-for="item in menu" :key="item" class="text-body-1 blue-grey-darken-4" :href="`#${item.toLowerCase()}`"
        variant="text">
        {{ item }}
      </v-btn>
    </div>

    <template #append>
      <div class="pe-6" >
        <v-btn :icon="theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'"
          @click="toggleTheme" class="border"/>
        <UserMenu />
      </div>

    </template>
  </v-app-bar>
</template>

<script setup>
import UserMenu from '@/Layout/Components/UserMenu.vue';
import { useTheme } from 'vuetify';
import { router } from '@inertiajs/vue3';
import { useUserStore } from '@/Stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isUserAuth } = storeToRefs(userStore);

const theme = useTheme()
const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const menu = [
  'Home',
  'Features',
  'Pricing',
  'Demo',
  'Contact',
  'Docs'
]
</script>
