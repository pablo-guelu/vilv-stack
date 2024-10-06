import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore('global', () => {
    const AppErrors = ref<string[]>([]);
    const AppSuccess = ref<string[]>([]);

    const errorSnackBar = ref(false);
    const successSnackBar = ref(false);

    return {
        AppErrors,
        AppSuccess,
        errorSnackBar,
        successSnackBar,
    };
});
