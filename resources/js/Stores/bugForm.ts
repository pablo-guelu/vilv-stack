import { FieldType } from "@/enums";
import { BugologField, Column, FormStructure, Row, TextField } from "@/types";
import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";

export const useBugFormStore = defineStore('bugForm', () => {

    const addFieldDialog = ref(false);
    const addFieldDialogType = ref(FieldType.TEXT);

    const defaultTextField = {
        id: '',
        type: FieldType.TEXT,
        label: '',
        placeholder: '',
        required: true,
        value: ''
    }

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

    const addField = (fieldData: BugologField | TextField) => {
        
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

    return {
        addFieldDialog,
        addFieldDialogType,
        formStructure,
        defaultTextField,
        addRow,
        deleteRow,
        addField,
        rowIndex,
        columnIndex,
        deleteColumn
    }
})