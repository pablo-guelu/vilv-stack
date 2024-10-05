<template>
    <v-dialog v-model="modelValue">
        <div class="d-flex justify-center w-100">
            <v-card class="rounded-lg d-flex flex-column justify-space-beteween" min-height="300" max-width="400">
                <v-card-title class="text-h6">Warning</v-card-title>
                <v-card-text class="d-flex align-center">
                    <v-row>
                        <v-col cols="12">
                            <v-alert variant="tonal" :type="warningType" elevation="2" icon="mdi-alert" dense>
                                <span class="text-body-1">{{ text }}</span>
                            </v-alert>
                        </v-col>
                    </v-row>
                </v-card-text>
                <div class="d-flex justify-center align-center">
                    <v-card-actions class="align-self-center">
                        <v-btn color="error" @click="modelValue = false">Close</v-btn>
                        <div v-if="action">
                            <v-btn color="success" @click="action">Confirm</v-btn>
                        </div>
                    </v-card-actions>
                    <slot name="action"></slot>
                </div>
            </v-card>
        </div>
    </v-dialog>
</template>

<script lang="ts" setup>

const modelValue = defineModel({ required: true, type: Boolean });

const props = withDefaults(defineProps<{
    warningType?: "warning" | "error" | "success" | "info" | undefined;
    text: string;
    action?: () => void;
}>(), {
    warningType: 'warning',
});

</script>

<style scoped>
.content_alignment {
    align-items: center;
}
</style>