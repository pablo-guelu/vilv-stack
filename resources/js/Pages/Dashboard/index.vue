<template>
    <BugologLayout>
        <template v-slot:main>
            <div class="h-100">
                <v-sheet class="d-flex flex-column align-center h-100 ma-10">
                    <LeftDrawer />

                    <v-sheet class="ma-4 rounded-lg w-100 justify-self-center" max-width="1200px">

                        <v-tabs v-model="indexMode">
                            <v-tab value="IndexMode.SETTINGS">Settings</v-tab>
                            <v-tab value="IndexMode.FORMS">Forms</v-tab>
                        </v-tabs>

                        <v-tabs-window v-model="indexMode">
                            <v-tabs-window-item value="IndexMode.SETTINGS">
                                <Settings />
                            </v-tabs-window-item>
                            <v-tabs-window-item value="IndexMode.FORMS">
                                <FormsList :forms="forms" />
                            </v-tabs-window-item>
                        </v-tabs-window>

                    </v-sheet>
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
import { useBugFormStore } from '@/Stores/bugForm';
import { router } from '@inertiajs/vue3'
import UserInfo from '@/User/UserInfo.vue';
import LeftDrawer from '@/Layout/Components/LeftDrawer.vue';
import Settings from '@/User/Settings.vue'
import { IndexMode } from '@/enums';
import FormsList from '@/Form/FormsList.vue';

const props = defineProps<{
    isUserAuth: boolean;
    user: User;
    forms: Form[];
}>();

const userStore = useUserStore();
const { user, isUserAuth, indexMode } = storeToRefs(userStore);

const bugFormStore = useBugFormStore();

user.value = { ...props.user }
isUserAuth.value = props.isUserAuth

const headers = [
    { title: 'Title', key: 'title', sortable: true, align: 'start' },
    { title: 'Created At', key: 'created_at', sortable: true, align: 'start' },
    { title: 'Actions', key: 'actions', sortable: false, align: 'center' },
];

const editForm = (id: string) => {
    router.visit(`/form/${id}/edit`)
}

const deleteForm = (id: string) => {
    router.delete(`/form/${id}`)
}
</script>