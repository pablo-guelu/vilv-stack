<template>
    <div>
        <AddFieldFrame title="Add HTML Editor" :addAction="addHTMLField" />
    </div>
</template>

<script lang="ts" setup>
import AddFieldFrame from '@/Components/AddFieldFrame.vue';
import { useAddField } from '@/Composables/addField';
import { FieldType } from '@/enums';

const addHTMLField = () => useAddField(FieldType.HTML);


</script>