<template>
    <v-list-item class="w-100 rounded border-sm my-4 pa-0" draggable="true" color="success">

        <template v-slot:prepend="">
            <div class="d-flex h-100 justify-center align-center rounded-s-lg border-e-sm" style="width: 50px;">
                <v-btn color="transparent" flat block :ripple="false" >
                    <v-icon size="x-large">
                        {{ `mdi-numeric-${colsNumber}` }}
                    </v-icon>
                </v-btn>
            </div>
        </template>

        <v-list-item-title class="text-none ps-4">{{ `${colsNumber} - Column${colsNumber > 1 ? 's' : ''} Row` }}</v-list-item-title>

        <template v-slot:append="">
            <div class="d-flex h-100 justify-center align-center rounded-e border-s-sm" style="width: 40px; background-color: #6A1B9A;">
                <v-btn color="transparent" @click="addRow(colsNumber)" flat>
                    <v-icon size="large" color="white">
                        mdi-plus
                    </v-icon>
                </v-btn>
            </div>
        </template>
    </v-list-item>
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';

const props = defineProps<{
    colsNumber: number
}>();

const bugFormStore = useBugFormStore();
const { addRow } = bugFormStore;

</script>

<style scoped>

:deep(.v-list-item__append) {
    height: 100%;
}

:deep(.v-list-item-title) {
    height: 100%;
}

</style>