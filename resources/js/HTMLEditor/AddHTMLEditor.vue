<template>
    <div>
        <AddFieldFrame title="HTML Editor" :addAction="addHTMLField" />
    </div>
</template>

<script lang="ts" setup>
import AddFieldFrame from '@/Components/AddFieldFrame.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { FieldType } from '@/enums';


const bugFormStore = useBugFormStore();
const addHTMLField = () =>  bugFormStore.openAddFieldDialog(FieldType.HTML);

</script>