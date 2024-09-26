<template>
    <div v-if="img" class="d-flex justify-center align-center">
        <v-img :src="imgSrc" :alt="img.alt" :width="img.width ?? 400" :height="img.height ?? 200" lazy-src="https://picsum.photos/400/200" />
    </div>
</template>

<script lang="ts" setup>
import { Image } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
    img?: Image
}>()

const imgSrc = computed(() => {
    if (!props.img) {
        return ''
    }
    if (props.img.src instanceof File) {
        return URL.createObjectURL(props.img.src)
    }
    if (Array.isArray(props.img.src) && props.img.src[0] instanceof File) {
        return URL.createObjectURL(props.img.src[0])
    }
    // Use img.src if it's a string, otherwise fall back to img.path
    return typeof props.img.src === 'string' ? props.img.src : props.img.path || ''
})
</script>