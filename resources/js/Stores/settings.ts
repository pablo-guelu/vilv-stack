import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore('settings', () => {
    const redirectAfterSubmit = ref(false);
    const redirectUrl = ref('');
    const afterSubmittingMessage = ref('');
    const recipients = ref<string[]>([]);
    const ccs = ref<string[]>([]);

    return {
        redirectAfterSubmit,
        redirectUrl,
        afterSubmittingMessage,
        recipients,
        ccs,
    };
});
