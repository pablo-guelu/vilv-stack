<template>

    <v-textarea v-model="field.result!.function" variant="outlined" density="compact" label="Result Function"
        placeholder="() => { }" hint="This function will update the result when the form values (names) are updated."
        persistent-hint />
    <div class="d-flex justify-end">
        <v-btn class="justify-self-end mt-4" size="small" color="primary" variant="tonal" @click="apply">Apply</v-btn>
    </div>

</template>

<script lang="ts" setup>
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const bugFormStore = useBugFormStore();
const { formStructure, currentRowIndex, currentColumnIndex } = storeToRefs(bugFormStore);

const field = computed(() => {
    return formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field!
});

const functionFromString = (functionString: string) => {
    // Parse the function string for field names and add their values
    const fieldNames = formStructure.value.rows.flatMap(row => 
        row.columns.map(column => column.field?.name)
    ).filter(name => name);

    let preparedFunction = '(function() {\n';
    for (const name of fieldNames) {
        if (name && name.trim() && functionString.includes(name)) {
            const field = formStructure.value.rows.flatMap(row => 
                row.columns.map(column => column.field)
            ).find(field => field?.name === name);
            
            if (field?.value !== undefined) {
                const value = typeof field.value === 'string' ? `'${field.value}'` : field.value;
                preparedFunction += `    const ${name} = ${value};\n`;
            }
        }
    }
    preparedFunction += `    return ${functionString};\n})`;

    console.log(preparedFunction);
    return new Function('return ' + preparedFunction)();
}

const apply = () => {
    
    field.value.result!.result = functionFromString(field.value.result!.function);
    console.log(typeof field.value.result!.result);
    // Remove the immediate invocation here
    const result = field.value.result!.result();
    console.log(result);
}

</script>