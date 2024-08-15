import { FieldType } from "@/enums";
import { BugologField, Column, FormStructure, Row, TextField } from "@/types";
import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";

export const useBugFormStore = defineStore('bugForm', () => {

    const addFieldDialog = ref(false);
    const addFieldDialogType: Ref<FieldType> = ref(FieldType.TEXT);

    const defaultField: Ref<BugologField> = ref({
        id: '',
        type: FieldType.TEXT,
        label: '',
        placeholder: '',
        required: true,
        value: '',
        inputType: '',
    })

    const defaultColumn = (): Column => {
        return {
            field: undefined
        }
    }
    const defaultRow = (colsN: number = 1): Row => {
        return {
            colsNumber: colsN,
            columns: Array.from({ length: colsN }, () => defaultColumn())
        }
    }

    const formStructure: Ref<FormStructure> = ref({
        rows: [defaultRow()]
    })

    const rowIndex = ref(0)

    const addRow = (columnsNumber: number = 1) => {
        formStructure.value.rows.push(defaultRow(columnsNumber))
        rowIndex.value = formStructure.value.rows.length - 1
    }

    const deleteRow = (index: number) => {
        formStructure.value.rows.splice(index, 1)
        rowIndex.value = formStructure.value.rows.length - 1
    }

    const columnIndex = ref(0)

    const currentRow = computed(() => formStructure.value.rows[rowIndex.value])

    const addField = (fieldData: BugologField) => {
        
        if (formStructure.value.rows.length < 1) {
            addRow(1)
            addField(fieldData)
        }

        if (currentRow.value.colsNumber === 1) {
            currentRow.value.columns[0].field = { ...fieldData }
        } else {
            if (currentRow.value.columns[0].field === undefined) {
                currentRow.value.columns[0].field = { ...fieldData }
            } else {
                currentRow.value.columns[1].field = { ...fieldData }
            }
        }
    }

    const deleteColumn = (rowIndex: number, columnIndex: number) => {     
        formStructure.value.rows[rowIndex].columns[columnIndex].field = undefined
    }

    const addHTMLEditor = () => {

    }

    const requiredRule = (v: string) => !!v || 'Field is required';

    const createFieldData = ref();

    return {
        addFieldDialog,
        addFieldDialogType,
        formStructure,
        defaultField,
        addRow,
        deleteRow,
        addField,
        rowIndex,
        columnIndex,
        deleteColumn,
        requiredRule,
        createFieldData
    }
})