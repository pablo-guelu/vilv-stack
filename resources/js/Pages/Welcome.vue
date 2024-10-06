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
import { usePreferencesStore } from '@/Stores/preferences';
import { storeToRefs } from 'pinia';
const props = defineProps<{
    isUserAuth?: boolean;
    user: User;
    preferences: any;
}>();

console.log(props.preferences)


const userStore = useUserStore();
const { user, isUserAuth } = storeToRefs(userStore);

const preferencesStore = usePreferencesStore();
const { currentTheme } = storeToRefs(preferencesStore);

// const prefs = JSON.parse(props.preferences.preferences)
// console.log(prefs)

console.log(props.user)

user.value = {...props.user}
isUserAuth.value = props.isUserAuth
// currentTheme.value = props.preferences.theme
// theme.global.name.value = currentTheme.value

</script>
