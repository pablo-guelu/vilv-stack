import { useUserStore } from '@/Stores/user';
import { User } from '@/types';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

export function useUserHydration(userParam: User, isUserAuthParam: boolean) {
    const userStore = useUserStore();
    const { user, isUserAuth } = storeToRefs(userStore);

    const hydrateUserStore = () => {
        user.value = userParam;
        isUserAuth.value = isUserAuthParam;
    }

    onMounted(() => {
        hydrateUserStore();
    });
}
