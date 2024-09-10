<template>
    <v-card class="pa-6 border rounded-lg mx-auto my-4 w-100" flat>
        <v-card-title class="text-h4 mb-6">Settings</v-card-title>
        <v-card-text class="">
            <v-form @submit.prevent="" ref="settingsForm">
                <v-row>
                    <v-col cols="12">
                        <v-switch v-model="user.redirect_after_submit" :hide-details="true"
                            label="Redirect after submitting" color="primary">
                            <template v-slot:label>
                                <Label name="Redirect URL" info
                                    infoString="After the user submits the form, they will be redirected to this URL." />
                            </template>
                        </v-switch>

                        <v-text-field v-if="user.redirect_after_submit" v-model="user.redirect_url" required
                            variant="outlined" density="compact" placeholder="https://my-docs.com"></v-text-field>
                    </v-col>
                    <v-col>
                        <Label name="Message after Submmition" info
                            infoString="This message will be shown to the user after your users submit the form." />
                        <div>
                            <QuillEditor v-model:content="user.afterSubmittingMessage" content-type="html" />
                        </div>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>

                        <!-- RECIEPIENTS -->
                        <Label name="Recipients" info
                            infoString="This are the email addresses that will receive the form submissions." />
                        <v-row class="mt-4" v-if="user.recipients.length > 0">
                            <v-chip v-for="recepient, index in user.recipients" :key="recepient" class="ma-2" closable
                                @click:close="deleteRecipient(index)"> {{ recepient }}</v-chip>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="currentRecipient" variant="outlined" density="compact"
                                    placeholder="john@doe.com" @keydown="handleKeydown" ref="recipientInput"
                                    :rules="[emailRule, sameEmailRule]">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="2">
                                <v-btn @click="addRecipient" append-icon="mdi-plus" color="primary" class="w-100">
                                    Add
                                </v-btn>
                            </v-col>
                        </v-row>

                        <!-- CC -->
                        <Label name="CCs" info
                            infoString="With copy to" />
                        <v-row class="mt-4" v-if="user.ccs.length > 0">
                            <v-chip v-for="cc, index in user.ccs" :key="cc" class="ma-2" closable
                                @click:close="deleteCc(index)"> {{ cc }}</v-chip>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="currentRecipient" variant="outlined" density="compact"
                                    placeholder="john@doe.com" @keydown="handleKeydown" ref="recipientInput"
                                    :rules="[emailRule, sameEmailRule]">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="2">
                                <v-btn @click="addRecipient" append-icon="mdi-plus" color="primary" class="w-100">
                                    Add
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <div class="text-center">
                    <v-btn type="submit" append-icon="mdi-cog" color="primary" class="mt-10" @click="updateSettings">
                        Update Settings
                    </v-btn>
                </div>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import Label from '@/Components/Label.vue';
import { useUserStore } from '@/Stores/user';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { updateSettings } = userStore;

const currentRecipient = ref('');

const settingsForm = ref(null)

const addRecipient = () => {
    if (
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentRecipient.value)
        && !user.value.recipients.includes(currentRecipient.value)
    ) {
        user.value.recipients.push(currentRecipient.value);
        currentRecipient.value = '';
    } else {
        return
    }
}

const addCc = () => {
    if (
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentRecipient.value)
        && !user.value.ccs.includes(currentRecipient.value)
    ) {
        user.value.ccs.push(currentRecipient.value);
        currentRecipient.value = '';
    }
}

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === ',') {
        event.preventDefault();
        addRecipient();
    }
}

const emailRule = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value === '' || 'Invalid email address';
}

const sameEmailRule = (value: string) => {
    return !user.value.recipients.includes(value) || value === '' || 'Email already exists';
}

const deleteRecipient = (index: number) => {
    if (index >= 0 && index < user.value.recipients.length) {
        user.value.recipients.splice(index, 1);
    }
}

const deleteCc = (index: number) => {
    if (index >= 0 && index < user.value.ccs.length) {
        user.value.ccs.splice(index, 1);
    }
}

</script>

<style>
.ql-container {
    height: calc(100% - 92px);
    min-height: 200px;
    max-height: 400px;
}
</style>