<template>
    <div class="w-100 px-8">
        <v-row v-if="row.colsNumber < 2 && row.columns.length === 1">
            <v-col cols="12">
                <SelectorFieldType :field="row.columns[0].field!" />
            </v-col>
        </v-row>
        <v-row v-else-if="row.columns.length === 2">
            <v-col cols="12" md="6">
                <SelectorFieldType :field="row.columns[0].field!" />
            </v-col>
            <v-col cols="12" md="6">
                <SelectorFieldType :field="row.columns[1].field!" />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import SelectorFieldType from '@/Components/SelectorFieldType.vue';
import { Row } from '@/types';

const props = defineProps<{
    row: Row
}>()

</script>

<style>
</style>