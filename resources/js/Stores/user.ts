import { User } from "@/types";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { router } from '@inertiajs/vue3'

export const useUserStore = defineStore('user', () => {

    const isUserAuth = ref(false);

    const user: Ref<User> = ref({
        id: '',
        name:'',
        email: ''
    })

    const setUser = (userData: any) => {
        user.value = {...userData}
    }

    const logout = () => {
        router.visit('/logout')
    }

    return {
        isUserAuth,
        user,
        setUser,
        logout
    }
})