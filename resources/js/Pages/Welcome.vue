<template>
    <BugologLayout >
        <template v-slot:main>
            <Landing />
        </template>
    </BugologLayout>
</template>

<script lang="ts" setup>
import Landing from '@/LandingPage/Landing.vue';
import BugologLayout from '@/Layout/BugologLayout.vue';
import { useUserStore } from '@/Stores/user';
import { User } from '@/types';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    isUserAuth?: boolean;
    user: User;
}>();


const userStore = useUserStore();
const { user, isUserAuth } = storeToRefs(userStore);

user.value = {...props.user.data}
isUserAuth.value = props.isUserAuth

</script>