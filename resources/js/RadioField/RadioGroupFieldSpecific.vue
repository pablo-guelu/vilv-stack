<template>
    <div>
        <p class="text-body-1 mb-4">Radio Group Options:</p>
        <div>
            <template v-for="option, index in defaultField.radioGroup" :key="option.id">
                <v-row no-gutters>
                    <v-col cols="1">
                        <v-btn class="pt-2" icon="mdi-delete" variant="plain" density="compact" @click="deleteOption(index)" ></v-btn>
                    </v-col>
                    <v-col>
                        <v-text-field class="pe-2" label="label" v-model="option.label" variant="outlined" density="compact" ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field class="ps-2" label="value" v-model="option.value" variant="outlined" density="compact" ></v-text-field>
                    </v-col>
                </v-row>
            </template>
        </div>
        <v-btn variant="flat" color="primary" append-icon="mdi-plus" class="mt-2 mb-6" text="Add Option" @click="addOption" />
    </div>
</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { defaultField } = storeToRefs(bugFormStore);

const addOption = (index: number) => {
    defaultField.value.radioGroup!.push({ id: `${defaultField.value.label}-radioGroup-${index}`, label: '', value: '' });
}

const deleteOption = (index: number) => {
    defaultField.value.radioGroup!.splice(index, 1);
}

</script>