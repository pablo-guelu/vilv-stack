<template>
  <div class="preview-message">
    <div v-for="row, rowIndex in formStructure.rows" :key="`row-${rowIndex}`" class="preview-row">
      <template v-for="column, colIndex in row.columns" :key="`col-${colIndex}`">
        <div :class="{ 'preview-field': true, 'preview-field-full': row.colsNumber === 1 }">
          <strong>{{ column.field?.label }}:</strong> {{ column.field?.value }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormStructure } from '@/types';

const props = defineProps<{
  formStructure: FormStructure
}>()
</script>

<style scoped>
.preview-message {
  margin-bottom: 1rem;
}

.preview-row {
  display: flex;
  margin-bottom: 0.5rem;
}

.preview-field {
  flex: 1;
  padding-right: 1rem;
}

.preview-field-full {
  flex-basis: 100%;
}
</style>
