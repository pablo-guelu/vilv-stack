<template>
    <v-card class="mx-auto my-4 w-100" flat>

        <v-form ref="settingsForm">
            <v-card-text class="pa-0">
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-switch v-model="redirectAfterSubmit" :hide-details="true" label="Redirect after submitting"
                            color="primary">
                            <template v-slot:label>
                                <Label name="Redirect URL" info
                                    infoString="After the user submits the form, they will be redirected to this URL." />
                            </template>
                        </v-switch>
                        <!-- REDIRECT TO -->
                        <v-text-field v-if="redirectAfterSubmit" v-model="redirectUrl" required variant="outlined"
                            density="compact" placeholder="https://my-docs.com"></v-text-field>
                    </v-col>
                    <v-col>
                        <Label name="Message after Submmition" info
                            infoString="This message will be shown to the user after your users submit the form." />
                        <div>
                            <QuillEditor v-model:content="afterSubmittingMessage" content-type="html" toolbar="essential" />
                        </div>
                    </v-col>
                </v-row>
                <div class="mt-4 pa-2">
                    <!-- RECIEPIENTS -->
                    <Label name="Recipients" info infoString="Email addresses that will receive the form submissions." />
                    <v-row v-if="recipients.length > 0">
                        <v-chip v-for="recepient, index in recipients" :key="recepient" class="ma-2" closable
                            @click:close="deleteRecipient(index)"> {{ recepient }}</v-chip>
                    </v-row>
                    <div class="d-flex justify-center mt-2">
                        <v-text-field v-model="currentRecipient" variant="outlined" density="compact"
                            placeholder="john@doe.com"
                            @keydown="(event: KeyboardEvent) => handleKeydown(event, 'recipient')" ref="recipientInput"
                            :rules="[emailRule, sameEmailRule]" class="me-2">
                        </v-text-field>
                        <v-btn @click="addRecipient" icon="mdi-plus" color="primary" size="small" />
                    </div>
                    <!-- CC -->
                    <Label name="CCs" info infoString="With copy to" />
                    <v-row v-if="ccs.length > 0">
                        <v-chip v-for="cc, index in ccs" :key="cc" class="ma-2" closable @click:close="deleteCc(index)">
                            {{ cc
                            }}</v-chip>
                    </v-row>
                    <div class="d-flex justify-center mt-2">
                        <v-text-field v-model="currentCc" variant="outlined" density="compact" placeholder="john@doe.com"
                            @keydown="(event: KeyboardEvent) => handleKeydown(event, 'cc')" ref="recipientInput"
                            :rules="[emailRule, sameEmailRule]" class="me-2">
                        </v-text-field>
                        <v-btn @click="addCc" icon="mdi-plus" color="primary" size="small" />
                    </div>
                </div>
                <!-- BUGOLOG URL -->
                <div class="pa-2" >
                    <Label name="Your Bugolog URL" info
                        infoString="This string will appear after bugolog.com/{ Your string placed here }" />
                    <div class="d-flex justify-center align-center">
                        <v-text-field hide-details v-model="formSlug" label="" variant="outlined" density="compact"
                            :rules="[validBugologUrl]" />
                    </div>
                </div>
            </v-card-text>
        </v-form>
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
const { formSlug } = storeToRefs(bugFormStore);

const currentRecipient = ref('');
const currentCc = ref('');

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

const handleKeydown = (event: KeyboardEvent, ccOrRecipient: 'cc' | 'recipient') => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === ',') {
        event.preventDefault();
        if (ccOrRecipient === 'recipient') {
            addRecipient();
        } else {
            addCc();
        }
    }
}

const emailRule = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value === '' || 'Invalid email address';
}

const sameEmailRule = (value: string) => {
    return !recipients.value.includes(value) || value === '' || 'Email already exists';
}

const validBugologUrl = (value: string) => {
    return /^[a-zA-Z0-9]{1,}$/.test(value) || value === '' || 'Invalid bugolog url';
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