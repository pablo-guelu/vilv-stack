<template>
    <v-container style="max-width: 1250px;">
        <v-card flat>
            <v-card-title class="text-h2">Bugolog</v-card-title>
        </v-card>
        <form @submit.prevent="submitForm">
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <FormLabel :name="'Name'" required/>
                        <v-text-field variant="outlined" v-model="data.name" placeholder="John Doe" type="text" ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <FormLabel :name="'Subject'" required/>
                        <v-text-field variant="outlined" v-model="data.subject" placeholder="Bug in version 1.0" type="text" ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <FormLabel :name="'Email'" required />
                        <v-text-field variant="outlined" v-model="data.email" placeholder="john.doe@example.com" type="email"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <FormLabel :name="'Product'" />
                        <v-text-field variant="outlined" v-model="data.product" placeholder="Product" type="text" ></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mt-6 mb-8">
                    <div class="h-100 px-3">
                        <FormLabel :name="'Issue Description'" required :info="'vuetify.com'"/>
                        <div class="mt-4 mb-16" style="height: 300px;">
                            <QuillEditor ref="editor" theme="snow" toolbar="full" v-model:content="data.issueDescription" content-type="html"/>
                        </div>
                    </div>
                </v-row>
                <v-row class="">
                    <v-col cols="12" md="6">
                        <FormLabel :name="'Attachments'"/>
                        <v-file-input variant="outlined" v-model="data.files" label="Attachments" prepend-icon=""
                            append-inner-icon="mdi-paperclip" multiple></v-file-input>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="d-flex justify-center justify-md-end">
                        <v-btn type="submit" color="primary" size="large">Submit</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </form>
    </v-container>
</template>

<script lang="ts" setup>
import { useForm, router } from '@inertiajs/vue3'
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import FormLabel from '@/Components/FormLabel.vue'
import { onMounted, reactive, ref } from 'vue';

const data = reactive({
    name: '',
    email: '',
    subject: '',
    issueDescription: '',
    files: [],
    product: ''
});

const setDefaultData = () => {
    data.name = 'Paul Doe'
    data.subject = 'Bug in version 1.0'
    data.email = 'support@bugolog.com'
    data.issueDescription = '<h1><span style="color: rgb(102, 185, 102);">This</span> a test HTML</h1><h1><br></h1><p><strong><em>Nothing else to add apart from</em></strong><strong style="color: rgb(230, 0, 0);"><em> seeing how the HTML is displayed in the email</em></strong></p><p><br></p>'
    data.product = 'Bugolog'
}   


onMounted(() => {
    setDefaultData()
})

const editor = ref()

const submitForm = () => {
    router.post('/send', data)
}

const getHtml = () => {
    // let dataEditor = editor.value.getHtml();
    console.log(data.issueDescription)
}

</script>