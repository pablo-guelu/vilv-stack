<template>
  
    <v-navigation-drawer rail-width="450" rail>
      <UserInfo />
    </v-navigation-drawer>
  
</template>

<script lang="ts" setup>
import { useUserStore } from '@/Stores/user';
import UserInfo from '@/User/UserInfo.vue';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>