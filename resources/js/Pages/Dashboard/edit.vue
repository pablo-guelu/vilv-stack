<template>
    <BugologLayout>
        <template v-slot:main>
            <BugologDashboard />
        </template>
    </BugologLayout>
</template>

<script lang="ts" setup>
import BugologDashboard from '@/Form/BugologDashboard.vue';
import BugologLayout from '@/Layout/BugologLayout.vue';
import { storeToRefs } from 'pinia';
import { Form, User } from "@/types";
import { useBugFormStore } from '@/Stores/bugForm';
import { useUserHydration } from '@/Composables/User';

const props = defineProps<{
    form: Form
    isUserAuth: boolean;
    user: User;
}>();

useUserHydration(props.user, props.isUserAuth);

const bugStore = useBugFormStore();
const { formStructure, formTitle, formId } = storeToRefs(bugStore);

formId.value = props.form.id;
formTitle.value = props.form.title;
formStructure.value = JSON.parse(props.form.form_structure as unknown as string);

</script>   