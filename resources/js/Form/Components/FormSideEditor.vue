<template>
    <div class="d-flex justify-center w-100">
        <v-card width="400px" class="pa-8" rounded="lg">
            <v-card-title v-text="'Form Editor'" class="px-0 mb-3" />
            <v-form ref="fieldForm" fastfail>
                <v-select variant="outlined" density="compact" :items="variants" v-model="selectedVariant" ></v-select>
            </v-form>

            <v-card-actions class="d-flex justify-center">
                <v-btn variant="tonal" color="success" class="mx-3" text="update" />
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { } = storeToRefs(bugFormStore);
const { } = bugFormStore;

const variants = ref([
    "filled",
    "underlined",
    "outlined",
    "plain",
    "solo",
    "solo-inverted",
    "solo-filled"
])

const selectedVariant = ref('outlined');

const updateVariant = () => {
    
}


</script>