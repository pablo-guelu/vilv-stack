<template>
    <BugologLayout>
        <template v-slot:main>
            <BugologDashboard />
        </template>
    </BugologLayout>
</template>

<script lang="ts" setup>
import BugologDashboard from '@/Form/BugologDashboard.vue';
import BugologLayout from '@/Layout/BugologLayout.vue';


</script>   