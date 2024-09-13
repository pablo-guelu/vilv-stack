<template>
    <v-card class="pa-6 border rounded-lg mx-auto my-4 w-100" flat>
        <v-card-title class="text-h4 mb-6">Settings</v-card-title>
        <v-card-text class="">
            <v-form @submit.prevent="" ref="settingsForm">
                <v-row>
                    <v-col cols="12">
                        <v-switch v-model="redirectAfterSubmit" :hide-details="true"
                            label="Redirect after submitting" color="primary">
                            <template v-slot:label>
                                <Label name="Redirect URL" info
                                    infoString="After the user submits the form, they will be redirected to this URL." />
                            </template>
                        </v-switch>

                        <!-- REDIRECT TO -->
                        <v-text-field v-if="redirectAfterSubmit" v-model="redirectUrl" required
                            variant="outlined" density="compact" placeholder="https://my-docs.com"></v-text-field>
                    </v-col>
                    <v-col>
                        <Label name="Message after Submmition" info
                            infoString="This message will be shown to the user after your users submit the form." />
                        <div>
                            <QuillEditor v-model:content="afterSubmittingMessage" content-type="html" toolbar="essential"/>
                        </div>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <!-- RECIEPIENTS -->
                        <Label name="Recipients" info
                            infoString="Email addresses that will receive the form submissions." />
                        <v-row class="mt-4" v-if="recipients.length > 0">
                            <v-chip v-for="recepient, index in recipients" :key="recepient" class="ma-2" closable
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
                        <v-row class="mt-4" v-if="ccs.length > 0">
                            <v-chip v-for="cc, index in ccs" :key="cc" class="ma-2" closable
                                @click:close="deleteCc(index)"> {{ cc }}</v-chip>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="currentCc" variant="outlined" density="compact"
                                    placeholder="john@doe.com" @keydown="handleKeydown" ref="recipientInput"
                                    :rules="[emailRule, sameEmailRule]">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="2">
                                <v-btn @click="addCc" append-icon="mdi-plus" color="primary" class="w-100">
                                    Add
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <div class="text-center">
                    <v-btn type="submit" append-icon="mdi-content-save-cog" color="primary" class="mt-10" @click="saveForm">
                        Update Settings
                    </v-btn>
                </div>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import Label from '@/Components/Label.vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useSettingsStore } from '@/Stores/settings';
import { useBugFormStore } from '@/Stores/bugForm';

const settingsStore = useSettingsStore();
const { redirectAfterSubmit, redirectUrl, afterSubmittingMessage, recipients, ccs } = storeToRefs(settingsStore);

const bugFormStore = useBugFormStore();
const { saveForm } = bugFormStore;

const currentRecipient = ref('');
const currentCc = ref('');
const settingsForm = ref(null)

if (redirectUrl.value !== '') redirectAfterSubmit.value = true;

const addRecipient = () => {
    if (
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentRecipient.value)
        && !recipients.value.includes(currentRecipient.value)
    ) {
        recipients.value.push(currentRecipient.value);
        currentRecipient.value = '';
    } else {
        return
    }
}

const addCc = () => {
    if (
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentCc.value)
        && !ccs.value.includes(currentCc.value)
    ) {
        ccs.value.push(currentCc.value);
        currentCc.value = '';
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
    return !recipients.value.includes(value) || value === '' || 'Email already exists';
}

const deleteRecipient = (index: number) => {
    if (index >= 0 && index < recipients.value.length) {
        recipients.value.splice(index, 1);
    }
}

const deleteCc = (index: number) => {
    if (index >= 0 && index < ccs.value.length) {
        ccs.value.splice(index, 1);
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