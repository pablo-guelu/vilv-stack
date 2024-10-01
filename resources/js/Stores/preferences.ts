import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import { router } from '@inertiajs/vue3';

export const usePreferencesStore = defineStore('preferences', () => {
    const theme = useTheme();

    const toggleTheme = () => {
        theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }

    const savePrefences = () => {
        router.post('/preferences', {
            preferences: JSON.stringify({
                theme: theme.global.name.value
            })
        })
    }

    return {
        theme,
        toggleTheme,
        savePrefences
    };
});
