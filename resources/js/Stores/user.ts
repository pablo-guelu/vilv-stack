import { User } from "@/types";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { router } from '@inertiajs/vue3'
import { PlanType } from "@/enums";

export const useUserStore = defineStore('user', () => {

    const isUserAuth = ref(false);

    const user: Ref<User> = ref({
        id: '',
        name:'',
        email: '',
        company_name: '',
        company_website: '',
        company_logo: [],
        redirect_url: '',
        plan_type: PlanType.FREE
    })

    const setUser = (userData: any) => {
        user.value = {...userData}
    }

    const logout = () => {
        user.value = {
            id: '',
            name:'',
            email: ''
        }
        isUserAuth.value = false
        router.post('/logout')
    }

    return {
        isUserAuth,
        user,
        setUser,
        logout
    }
})