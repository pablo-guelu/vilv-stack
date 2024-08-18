import { FieldType } from "@/enums";
import { BugologField, Column, FormStructure, Row } from "@/types";
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
        items: [],
        multiple: false,
        clearable: false,
        fileInput: null
    }

    const defaultField: Ref<BugologField> = ref({
        id: '',
        type: FieldType.TEXT,
        label: '',
        placeholder: '',
        required: true,
        value: '',
        inputType: 'text',
        items: [],
        itemsString: '',
        multiple: false,
        clearable: false,
        fileInput: null,
    })

    const defaultColumn = (): Column => {
        return {
            field: { ...emptyField }
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
        currentColumnIndex.value = 0
    }

    const deleteRow = (index: number) => {
        formStructure.value.rows.splice(index, 1)
        currentRowIndex.value = formStructure.value.rows.length - 1
        warningDeleteRow.value = false;
    }

    const currentColumnIndex = ref(0)

    const currentRow = computed(() => formStructure.value.rows[currentRowIndex.value])

    const currentField = computed(() => currentRow.value.columns[currentColumnIndex.value])

    const selectFieldStringToArray = (itemsString: string) => {
        if (itemsString) {
            const itemsArray = itemsString.split(',').map(item => item.trim());
            return itemsArray;
        }
    }

    const addField = (fieldData: BugologField) => {

        fieldData.items = selectFieldStringToArray(fieldData.itemsString!);

        formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field = { ...fieldData }

    };

    const updateField = (fieldData: BugologField) => {

        fieldData.items = selectFieldStringToArray(fieldData.itemsString!);

        formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field = { ...fieldData }
    }

    const deleteField = (rowIndex: number, columnIndex: number) => {
        formStructure.value.rows[rowIndex].columns[columnIndex].field = { ...emptyField }
        warningDeleteField.value = false;
    }

    const editFieldMode = ref(true);

    const editField = (rowIndex: number, columnIndex: number) => {
        currentRowIndex.value = rowIndex;
        currentColumnIndex.value = columnIndex;
        editFieldMode.value = true;
        defaultField.value = formStructure.value.rows[rowIndex].columns[columnIndex].field!;
        addFieldDialogType.value = defaultField.value.type;
        addFieldDialog.value = true
    }

    const requiredRule = (v: string) => !!v || 'Field is required';

    const openAddFieldDialog = (fieldType: FieldType) => {

        if (formStructure.value.rows.length < 1) {
            warningMissingRow.value = true;
            return
        }

        if (formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field?.label === '') {
            if (!editFieldMode.value) {
                defaultField.value = { ...emptyField }
                defaultField.value.type = fieldType;
                addFieldDialogType.value = fieldType;
                addFieldDialog.value = true
            } else {

                defaultField.value = formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field!;

                if (defaultField.value.type === FieldType.SELECT) {
                    defaultField.value.itemsString = (formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field!.items as any).join(', ');
                }

                addFieldDialog.value = true
            }

        } else {
            warningMissingRow.value = true;
            return
        }

    }

    const resetFieldData = () => {
        defaultField.value = { ...emptyField }
    }

    const warningDeleteField = ref(false);
    const warningDeleteRow = ref(false);
    const warningMissingRow = ref(false);

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
        deleteField,
        editField,
        requiredRule,
        resetFieldData,
        currentRow,
        currentField,
        warningDeleteField,
        warningDeleteRow,
        warningMissingRow
    }
})