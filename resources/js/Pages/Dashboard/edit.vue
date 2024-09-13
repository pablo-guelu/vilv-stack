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

const bugStore = useBugFormStore();
const { formStructure, formTitle, formId } = storeToRefs(bugStore);

formId.value = props.form.id;
formTitle.value = props.form.title;
formStructure.value = JSON.parse(props.form.form_structure as unknown as string);

const settings = useSettingsStore();
const { redirectUrl, afterSubmittingMessage, recipients, ccs } = storeToRefs(settings);

console.log(props.settings);

redirectUrl.value = props.settings.redirect_url;
afterSubmittingMessage.value = props.settings.after_submitting_message;
recipients.value = JSON.parse(props.settings.recipients as unknown as string);
ccs.value = JSON.parse(props.settings.ccs as unknown as string);


</script>   