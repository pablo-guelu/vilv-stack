import { User } from "@/types";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { router } from '@inertiajs/vue3'
import { IndexMode, PlanType } from "@/enums";

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
        plan_type: PlanType.FREE,
        recipients: [],
        ccs: [],
        afterSubmittingMessage: '',
        redirect_after_submit: false
    })

    const setUser = (userData: any) => {
        user.value = {...userData}
    }

    const logout = () => {
        user.value = {
            id: '',
            name:'',
            email: '',
            recipients: []
        }
        isUserAuth.value = false
        router.post('/logout')
    }

    const indexMode = ref(IndexMode.FORMS)

    const updateSettings = () => {
        router.post('/user/settings', {
            redirect_url: user.value.redirect_url,
            after_submitting_message: user.value.afterSubmittingMessage,
            recipients: user.value.recipients
        })
    }

    const updateProjectInfo = () => {
        router.post('/user/project', {
            name: user.value.name,
            email: user.value.email,
            company_name: user.value.company_name,
            company_website: user.value.company_website,
            company_logo: user.value.company_logo
        })
    }

    return {
        isUserAuth,
        user,
        setUser,
        logout,
        indexMode,
        updateSettings,
        updateProjectInfo
    }
})