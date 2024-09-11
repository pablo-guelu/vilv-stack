<template>

    <v-card class="pa-6 mx-auto mt-8 w-100" style="box-sizing: border-box;" flat>
        <v-card-title class="text-h5 mb-6">Project Info</v-card-title>

        <div class="d-flex justify-center">
            <div v-if="user.company_logo" class="mb-4" @mouseover="overlayAddLogo = true"
                @mouseleave="overlayAddLogo = false">
                <v-img :src="companyLogoUrl" width="125" height="125" cover class="rounded-circle">
                    <v-overlay v-model="overlayAddLogo" class="align-center justify-center" contained>
                        <v-btn color="success" @click="loadLogo" icon="mdi-image-plus" />
                    </v-overlay>
                </v-img>
            </div>
            <div v-else class="mb-6" @mouseover="overlayAddLogo = true" @mouseleave="overlayAddLogo = false">
                <v-img src="/storage/placeholder/cricket.png" width="100" height="100" >
                    <v-overlay v-model="overlayAddLogo" class="align-center justify-center rounded-circle" contained>
                        <v-btn color="success" @click="loadLogo" icon="mdi-image-plus" />
                    </v-overlay>
                </v-img>
            </div>

        </div>

        <v-card-text class="">
            <v-form @submit.prevent="updateProjectInfo">
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="user.name" label="Name" required variant="outlined"
                            density="compact"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="user.email" label="Email" required variant="outlined"
                            density="compact"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="user.company_name" label="Company Name" required variant="outlined"
                            density="compact"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="user.company_website" label="Company Website" required variant="outlined"
                            density="compact"></v-text-field>
                    </v-col>
                </v-row>

                <v-btn type="submit" color="primary" class="mt-10 w-100">
                    Update Information
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>

</template>

<script lang="ts" setup>
import { useUserStore } from '@/Stores/user';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { updateProjectInfo } = userStore;

const companyLogoUrl = computed(() => {
    const logo = user.value.company_logo;
    return logo instanceof File
        ? URL.createObjectURL(logo)
        : (typeof logo === 'string' ? logo : '/storage/placeholder/cricket.png');
});

const overlayAddLogo = ref(false);

const loadLogo = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            user.value.company_logo = file;
            overlayAddLogo.value = false;
        }
    };
    fileInput.click();
}


</script>