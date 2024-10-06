<template>
    <v-card class="pa-6 mx-auto mt-8 w-100" style="box-sizing: border-box;" flat>

        <v-tabs color="primary" v-model="tab" fixed-tabs class="mb-10">
            <v-tab value="profile">Profile</v-tab>
            <v-tab value="preferences">Preferences</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">

            <!-- PROFILE -->
            <v-tabs-window-item value="profile">
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
                        <v-img src="/storage/placeholder/cricket.png" width="100" height="100">
                            <v-overlay v-model="overlayAddLogo" class="align-center justify-center rounded-circle"
                                contained>
                                <v-btn color="success" @click="loadLogo" icon="mdi-image-plus" />
                            </v-overlay>
                        </v-img>
                    </div>

                </div>

                <v-card-text>
                    <v-form @submit.prevent="updateProjectInfo" class="d-flex flex-column align-center">
                        <div class="d-flex flex-column w-100">
                            <v-text-field v-model="user.name" label="Name" required variant="outlined"
                                density="compact"></v-text-field>
                            <v-text-field v-model="user.email" label="Email" required variant="outlined"
                                density="compact"></v-text-field>
                            <v-text-field v-model="user.company_name" label="Project Name" required variant="outlined"
                                density="compact"></v-text-field>
                            <v-text-field v-model="user.company_website" label="Website" required variant="outlined"
                                density="compact"></v-text-field>
                        </div>

                        <div class="d-flex justify-center">
                            <v-btn type="submit" color="primary" append-icon="mdi-content-save-cog" class="mt-10">
                                Update Information
                            </v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-tabs-window-item>

            <!-- PREFERENCES -->
            <v-tabs-window-item value="preferences">
                <v-card-text class="d-flex flex-column align-center w-100">
                    <v-form @submit.prevent="user?.id && savePrefences(user.id)"
                        class="d-flex flex-column align-cente justify-center w-100">
                        <v-select v-model="currentTheme" :items="themeOptions" label="Default Theme" variant="outlined"
                            density="compact" @update:modelValue    ="toggleTheme"></v-select>

                        <div class="d-flex justify-center">
                            <v-btn type="submit" color="primary" append-icon="mdi-content-save-cog" class="mt-10">
                                Update Preferences
                            </v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-tabs-window-item>
        </v-tabs-window>

    </v-card>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/Stores/user';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { usePreferencesStore } from '@/Stores/preferences';


const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { updateProjectInfo } = userStore;

const preferencesStore = usePreferencesStore();
const { currentTheme } = storeToRefs(preferencesStore);
const { toggleTheme, savePrefences } = preferencesStore;

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

const tab = ref('profile');

const themeOptions = [
    { title: 'Light', value: 'light' },
    { title: 'Dark', value: 'dark' },
];
</script>
