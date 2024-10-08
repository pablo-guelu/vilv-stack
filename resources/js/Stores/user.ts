import { User } from "@/types";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { router } from '@inertiajs/vue3'
import { IndexMode, PlanType } from "@/enums";
import { validateAndFormatUrl } from "@/utils";

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
            recipients: [],
            ccs: [],
            afterSubmittingMessage: '',
            redirect_after_submit: false
        }
        isUserAuth.value = false
        router.post('/logout')
    }

    const indexMode = ref(IndexMode.PROJECT_INFO)

    const updateSettings = () => {
        router.post('/user/settings', {
            redirect_url: user.value.redirect_url ? validateAndFormatUrl(user.value.redirect_url) : '',
            after_submitting_message: user.value.afterSubmittingMessage,
            recipients: user.value.recipients,
            ccs: user.value.ccs
        })
    }

    const updateProjectInfo = () => {
        const formData = new FormData();
        formData.append('name', user.value.name ?? '');
        formData.append('email', user.value.email ?? '');
        formData.append('company_name', user.value.company_name ?? '');
        formData.append('company_website', (user.value.company_website ? validateAndFormatUrl(user.value.company_website) : ''));
        
        if (user.value.company_logo instanceof File) {
            formData.append('company_logo', user.value.company_logo);
        }

        router.post('/user/project', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
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