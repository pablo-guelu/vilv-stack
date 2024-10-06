import { defineStore, storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import { router } from '@inertiajs/vue3';
import { useGlobalStore } from './global';

export const usePreferencesStore = defineStore('preferences', () => {
    const theme = useTheme();
    const currentTheme = ref('dark');

    const globalStore = useGlobalStore();
    const { AppErrors, AppSuccess, errorSnackBar, successSnackBar } = storeToRefs(globalStore);

    const toggleTheme = () => {
        theme.global.name.value = currentTheme.value
    }

    const savePrefences = (userId: string) => {
        router.post(`/preferences/${userId}`, {
            preferences: {
                theme: theme.global.name.value
            }
        }, {
            onSuccess: () => {
                AppSuccess.value = ['Preferences saved successfully'];
                successSnackBar.value = true;
            },
            onError: () => {
                AppErrors.value = ['Failed to save preferences'];
                errorSnackBar.value = true;
            }
        })
    }

    return {
        currentTheme,
        toggleTheme,
        savePrefences
    };
});
