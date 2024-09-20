<template>
    <div class="w-100 px-8">
        <v-row v-if="row.colsNumber < 2 && row.columns.length === 1">
            <v-col v-if="!field.empty" cols="12">
                <div :style="computedStyle">
                    <SelectorFieldType :field="row.columns[0].field!" />
                </div>
            </v-col>
        </v-row>
        <v-row v-else-if="row.columns.length === 2">
            <v-col v-if="!field.empty" cols="12" md="6">
                <div :style="computedStyle">
                    <SelectorFieldType :field="row.columns[0].field!" />
                </div>
            </v-col>
            <v-col v-if="!field1.empty" cols="12" md="6">
                <div :style="computedStyle1">
                    <SelectorFieldType :field="row.columns[1].field!" />
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import SelectorFieldType from '@/Components/SelectorFieldType.vue';
import { Row } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
    row: Row
}>()

const field = computed(() => props.row.columns[0].field!)
const field1 = computed(() => props.row.columns[1].field!)

const computedStyle = computed(() => {
    return `margin-top: ${field.value.customStyle?.marginTop || 0}px; margin-bottom: ${field.value.customStyle?.marginBottom || 0}px; margin-left: ${field.value.customStyle?.marginLeft || 0}px; margin-right: ${field.value.customStyle?.marginRight || 0}px; padding-top: ${field.value.customStyle?.paddingTop || 0}px; padding-bottom: ${field.value.customStyle?.paddingBottom || 0}px; padding-left: ${field.value.customStyle?.paddingLeft || 0}px; padding-right: ${field.value.customStyle?.paddingRight || 0}px;`
})

const computedStyle1 = computed(() => {
    return `margin-top: ${field1.value.customStyle?.marginTop || 0}px; margin-bottom: ${field1.value.customStyle?.marginBottom || 0}px; margin-left: ${field1.value.customStyle?.marginLeft || 0}px; margin-right: ${field1.value.customStyle?.marginRight || 0}px; padding-top: ${field1.value.customStyle?.paddingTop || 0}px; padding-bottom: ${field1.value.customStyle?.paddingBottom || 0}px; padding-left: ${field1.value.customStyle?.paddingLeft || 0}px; padding-right: ${field1.value.customStyle?.paddingRight || 0}px;`
})

</script>

<style></style>