<template>
    <BugologLayout>
        <template v-slot:main>
            <div class="h-100">
                <v-sheet class="d-flex flex-column align-center h-100" >
                    <LeftDrawer />

                    <v-sheet class="ma-4 rounded-lg w-100 justify-self-center" max-width="1200px">
                        <v-data-table :headers="headers" :items="forms" class="elevation-1 border">
                            <template v-slot:top>
                                <v-toolbar flat class="rounded-t-lg">
                                    <v-toolbar-title>Forms</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" variant="flat" class="me-6" @click="bugFormStore.newForm" >
                                        New Form
                                    </v-btn>
                                </v-toolbar>
                            </template>
                            <template v-slot:header="{ props: { headers } }">
                                <thead>
                                    <tr>
                                        <th v-for="header in headers" :key="header.key"
                                            class="text-capitalize"
                                            style="background-color: #f5f5f5; font-weight: bold;">
                                            {{ header.title }}
                                        </th>
                                    </tr>
                                </thead>
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <div class="d-flex justify-center">
                                    <v-btn icon="mdi-pencil" size="small" class="me-2" @click="editForm(item.id)" />
                                    <v-btn icon="mdi-delete" size="small" @click="deleteForm(item.id)" />
                                </div>
                            </template>
                        </v-data-table>
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

const props = defineProps<{
    isUserAuth: boolean;
    user: User;
    forms: Form[];
}>();

const userStore = useUserStore();
const { user, isUserAuth } = storeToRefs(userStore);

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