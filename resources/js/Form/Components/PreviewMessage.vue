<template>
  <v-sheet class="rounded-lg border mt-4">
    <div v-for="row, rowIndex in formStructure.rows" :key="`row-${rowIndex}`" class="d-flex flex-column justify-center w-100">
      <div v-for="column, colIndex in row.columns" :key="`col-${colIndex}`">
        <div v-if="column.field?.type !== FieldType.PARAGRAPH && !column.field?.empty" class="ma-3">
          <div class="text-h6 mb-3">{{ column.field?.label }}:</div>
          <p v-if="column.field?.type === FieldType.HTML" v-html="column.field?.value"></p>
          <p v-else class="text-body-1 font-weight-bold font-italic">{{ column.field?.value }}</p>
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { FieldType } from '@/enums';
import { FormStructure } from '@/types';

const props = defineProps<{
  formStructure: FormStructure
}>()
</script>

<style scoped>
</style>
