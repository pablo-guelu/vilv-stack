import { FieldType } from "@/enums";
import BugologTextField from "@/TextField/BugologTextField.vue";
import { BugologField, Column, FormStructure, Row, TextField } from "@/types";
import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";

export const useBugFormStore = defineStore('bugForm', () => {

    const addFieldDialog = ref(false);
    const addFieldDialogType: Ref<FieldType> = ref(FieldType.TEXT);

    const emptyField: BugologField = {
        id: '',
        type: FieldType.TEXT,
        label: '',
        placeholder: '',
        required: true,
        value: '',
        inputType: 'text',
    }

    const defaultField: Ref<BugologField> = ref({
        id: '',
        type: FieldType.TEXT,
        label: '',
        placeholder: '',
        required: true,
        value: '',
        inputType: 'text',
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

    const currentRowIndex = ref(0)

    const addRow = (columnsNumber: number = 1) => {
        formStructure.value.rows.push(defaultRow(columnsNumber))
        currentRowIndex.value = formStructure.value.rows.length - 1
    }

    const deleteRow = (index: number) => {
        formStructure.value.rows.splice(index, 1)
        currentRowIndex.value = formStructure.value.rows.length - 1
    }

    const currentColumnIndex = ref(0)

    const currentRow = computed(() => formStructure.value.rows[currentRowIndex.value])

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
    };

    const updateField = (fieldData: BugologField) => {
        formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field = { ...fieldData }
    }

    const deleteColumn = (rowIndex: number, columnIndex: number) => {
        formStructure.value.rows[rowIndex].columns[columnIndex].field = undefined
    }

    const editFieldMode = ref(true);

    const editColumn = (rowIndex: number, columnIndex: number) => {
        currentRowIndex.value = rowIndex;
        currentColumnIndex.value = columnIndex;
        editFieldMode.value = true;
        defaultField.value = formStructure.value.rows[rowIndex].columns[columnIndex].field!;
        addFieldDialogType.value = defaultField.value.type;
        addFieldDialog.value = true
    }

    const requiredRule = (v: string) => !!v || 'Field is required';

    const openAddFieldDialog = (fieldType: FieldType) => {
        if (!editFieldMode.value) {
            defaultField.value = { ...emptyField }
            defaultField.value.type = fieldType;
            addFieldDialogType.value = fieldType;
            addFieldDialog.value = true
        } else {
            defaultField.value = formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field!;
            addFieldDialog.value = true
        }

    }

    return {
        addFieldDialog,
        addFieldDialogType,
        editFieldMode,
        openAddFieldDialog,
        formStructure,
        defaultField,
        addRow,
        deleteRow,
        addField,
        updateField,
        currentRowIndex,
        currentColumnIndex,
        deleteColumn,
        editColumn,
        requiredRule,
    }
})