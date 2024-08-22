<template>
    <BugologLayout>
        <template v-slot:main>
            <v-sheet class="ma-4 pa-4 d-flex justify-center">
                <v-btn color="primary" variant="tonal" size="large" @click="bugFormStore.newForm" text="new form" />
            </v-sheet>
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
import { useBugFormStore } from '@/Stores/bugForm';

const props = defineProps<{
    isUserAuth: boolean;
    user: User;
    forms: Form[];
}>();

const userStore = useUserStore();
const { user, isUserAuth } = storeToRefs(userStore);

const bugFormStore = useBugFormStore();

user.value = {...props.user}
isUserAuth.value = props.isUserAuth

</script>   