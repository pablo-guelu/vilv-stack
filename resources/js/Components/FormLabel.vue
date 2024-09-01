<template>
    <div class="d-flex align-center w-100 my-2">
        <div class="text-h5 me-1">{{ field.label }}</div>


        <div class="d-flex tooltip_container ms-1">
            <v-btn v-if="field.info" density="compact" variant="tonal" icon="mdi-information-outline" class="text-disabled pa-0"
                @click="showInfo = !showInfo" />
            <v-sheet v-if="showInfo" class="tooltip_custom border pa-3 ms-2 overflow-y-scroll" max-width="500" v-html="field.infoString" color="surface" rounded="lg" />
        </div>

        <div v-if="field.required" class="ms-auto align-self-end text-subtitle-1 text-disabled font-italic">(required)
        </div>
    </div>

</template>

<script lang="ts" setup>
import { BugologField } from '@/types';
import { ref } from 'vue';

const props = defineProps<{
    field: BugologField
}>()

const showInfo = ref(false)
</script>

<style scoped>

.tooltip_container {
    position: relative;

}

.tooltip_custom {
    position: absolute;
    left: 100%;
    top: 20%;
    z-index: 1000;
}

</style>