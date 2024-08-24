<template>
    <v-list-item class="w-100 rounded-lg border-sm my-4 pa-0" :data-name="fieldType">
        <template v-slot:prepend="">
            <div class="d-flex h-100 justify-center align-center rounded-s-lg border-e-sm" style="width: 50px;">
                <v-btn color="transparent" flat block :ripple="false" >
                    <v-icon :icon="IconsFieldTypes[fieldType]" />
                </v-btn>
            </div>
        </template>

        <v-list-item-title class="text-none ps-4 border-e-sm">{{ fieldType }}</v-list-item-title>
        <template v-slot:append="">
            <div class="d-flex h-100 justify-center align-center rounded-e-lg" style="width: 50px; background-color: #2E7D32;">
                <v-btn color="transparent" @click="addField" flat class=" w-100 h-100">
                    <v-icon size="large" color="white">
                        mdi-plus
                    </v-icon>
                </v-btn>
            </div>
        </template>
    </v-list-item>
</template>

<script lang="ts" setup>

import { FieldType, IconsFieldTypes } from '@/enums';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
const bugFormStore = useBugFormStore();
const { editFieldMode } = storeToRefs(bugFormStore);

editFieldMode.value = false;

const props = defineProps<{
    fieldType: FieldType
}>();

const addField = () => bugFormStore.openSideEditor(props.fieldType);

</script>

<style scoped>

:deep(.v-list-item__append) {
    height: 100%;
}

</style>