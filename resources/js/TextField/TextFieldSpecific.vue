<template>
    <v-select variant="outlined" density="compact" label="Input Type" :items="inputTypesItems" v-model="inputType" :type="inputType">
    </v-select>
</template>

<script lang="ts" setup>
const inputType = defineModel<string>('inputType');
const inputTypesItems = ['text', 'email', 'password', 'number', 'url', 'tel', 'search', 'date', 'datetime-local', 'month', 'week', 'time', 'color'];
</script>