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
import { Form, Settings, User } from "@/types";
import { useBugFormStore } from '@/Stores/bugForm';
import { useUserHydration } from '@/Composables/User';
import { useSettingsStore } from '@/Stores/settings';

const props = defineProps<{
    form: Form
    settings: Settings
    isUserAuth: boolean;
    user: User;
}>();

useUserHydration(props.user, props.isUserAuth);

console.log(props.settings)

const bugStore = useBugFormStore();
const { formStructure, formTitle, formId, formSlug } = storeToRefs(bugStore);

formId.value = props.form.id;
formTitle.value = props.form.title;
formStructure.value = JSON.parse(props.form.form_structure as unknown as string);
formSlug.value = props.form.slug ?? '';

const settings = useSettingsStore();
const { redirectUrl, afterSubmittingMessage, recipients, ccs } = storeToRefs(settings);

redirectUrl.value = props.settings.redirect_url ?? ''; 
afterSubmittingMessage.value = props.settings.after_submitting_message ?? '';
recipients.value = props.settings.recipients ? JSON.parse(props.settings.recipients as unknown as string) : [];
ccs.value = props.settings.ccs ? JSON.parse(props.settings.ccs as unknown as string) : [];


</script>   