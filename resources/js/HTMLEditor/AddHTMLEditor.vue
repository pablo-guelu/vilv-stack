<template>
    <div>
        <AddFieldFrame title="Add HTML Editor" :addAction="() => addHTMLEditor()" />
    </div>
</template>

<script lang="ts" setup>
import AddFieldFrame from '@/Components/AddFieldFrame.vue';


const addHTMLEditor = () => {
    console.log('addHTMLEditor');
}

</script>