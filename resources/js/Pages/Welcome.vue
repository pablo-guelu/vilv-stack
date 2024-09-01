<template>
    <BugologLayout >
        <template v-slot:main>
            <div>WELCOME</div>
        </template>
    </BugologLayout>
</template>

<script lang="ts" setup>
import BugologLayout from '@/Layout/BugologLayout.vue';
import { useUserStore } from '@/Stores/user';
import { User } from '@/types';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    isUserAuth?: boolean;
    user?: User;
}>();


const userStore = useUserStore();
const { user, isUserAuth } = storeToRefs(userStore);

user.value = {...props.user}
isUserAuth.value = props.isUserAuth

</script>