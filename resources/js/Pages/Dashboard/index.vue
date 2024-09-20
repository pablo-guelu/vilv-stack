<template>
    <BugologLayout>
        <template v-slot:main>
            <div class="h-100">
                <v-sheet class="d-flex h-100">



                    <div class="d-flex ps-10 w-100" style="max-width: 550px;">
                        <UserInfo />
                        <v-divider class="my-16 ps-10" vertical />
                    </div>

                    

                    <div class="ps-10 mx-auto w-100" style="max-width: 1000px;">
                        <FormsList :forms="forms" />
                    </div>

                </v-sheet>
            </div>
        </template>
    </BugologLayout>
</template>

<script lang="ts" setup>
import BugologLayout from '@/Layout/BugologLayout.vue';
import { useUserStore } from '@/Stores/user';
import { storeToRefs } from 'pinia';
import { Form, User } from "@/types";
import FormsList from '@/Form/FormsList.vue';
import UserInfo from '@/User/UserInfo.vue';

const props = defineProps<{
    isUserAuth: boolean;
    user: User;
    forms: Form[];
}>();

const userStore = useUserStore();
const { user, isUserAuth } = storeToRefs(userStore);

user.value = { ...props.user.data }
isUserAuth.value = props.isUserAuth

</script>