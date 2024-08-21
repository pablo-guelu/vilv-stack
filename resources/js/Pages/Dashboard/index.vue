<template>
    <BugologLayout>
        <template v-slot:main>
            <FormsList :forms="forms" />
        </template>
    </BugologLayout>
</template>

<script lang="ts" setup>
import BugologLayout from '@/Layout/BugologLayout.vue';
import { useUserStore } from '@/Stores/user';
import { storeToRefs } from 'pinia';
import { Form, User } from "@/types";
import FormsList from '@/Form/FormsList.vue';

const props = defineProps<{
    isUserAuth: boolean;
    user: User;
    forms: Form[];
}>();

const userStore = useUserStore();
const { user, isUserAuth } = storeToRefs(userStore);

user.value = {...props.user}
isUserAuth.value = props.isUserAuth

</script>   