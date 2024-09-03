import { BugologMode, FieldType, FormMode, SideEditionMode } from "@/enums";
import { BugologField, Column, Form, FormStructure, Paragraph, Row } from "@/types";
import { router } from "@inertiajs/vue3";
import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";

export const useBugFormStore = defineStore('bugForm', () => {

    const sideFieldEditorType: Ref<FieldType> = ref(FieldType.TEXT);

    const formId = ref('');
    const formTitle = ref('');

    const defaultRadioOption = () => {
        return {
            id: '',
            value: '',
            label: ''
        }
    }

    const defaultCheckBox = () => {
        return {
            id: '',
            value: '',
            label: ''
        }
    }

    const emptyField: BugologField = {
        id: '',
        type: FieldType.TEXT,
        label: '',
        placeholder: '',
        required: false,
        info: false,
        infoString: '',
        value: '',
        inputType: 'text',
        items: [],
        itemsString: '',
        radioGroup: [{ ...defaultRadioOption() }],
        checkboxMultiple: false,
        checkboxGroup: [{ ...defaultCheckBox() }],
        paragraph: '',
        paragraphHTML: false,
        multiple: false,
        clearable: false,
        fileInput: null,
        variant: 'outlined',
        empty: true
    }

    const defaultField: Ref<BugologField> = ref({
        id: '',
        type: FieldType.TEXT,
        label: '',
        placeholder: '',
        required: false,
        info: false,
        infoString: '',
        value: '',
        inputType: 'text',
        items: [],
        itemsString: '',
        radioGroup: [{ ...defaultRadioOption() }],
        checkboxMultiple: false,
        checkboxGroup: [{ ...defaultCheckBox() }],
        paragraph: '',
        paragraphHTML: false,
        multiple: false,
        clearable: false,
        fileInput: null,
        variant: 'outlined',    
        empty: true
    })
    const defaultColumn = (): Column => {
        return {
            field: { ...emptyField },
        }
    }
    const defaultRow = (colsN: number = 1): Row => {
        return {
            colsNumber: colsN,
            columns: Array.from({ length: colsN }, () => defaultColumn())
        }
    }

    const emptyFormStructure = (): FormStructure => {
        return {
            variant: 'outlined', 
            rows: [
                defaultRow()
            ] 
        }
    }

    const formStructure: Ref<FormStructure> = ref({
        variant: 'outlined',
        rows: [defaultRow()]
    })

    const emptyForm = () => {
        return {
            id: '',
            title: '',
            form_structure: emptyFormStructure()
        }
    }

    const form: Ref<Form> = ref({
        id: formId.value,
        title: formTitle.value,
        form_structure: formStructure.value
    });

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
        if (fieldData.type === FieldType.SELECT) fieldData.items = selectFieldStringToArray(fieldData.itemsString!);
        formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field = { ...fieldData }
    };

    const updateField = (fieldData: BugologField) => {
        if (fieldData.type === FieldType.SELECT) fieldData.items = selectFieldStringToArray(fieldData.itemsString!);
        formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field = { ...fieldData }
    }

    const deleteField = (rowIndex: number, columnIndex: number) => {
        formStructure.value.rows[rowIndex].columns[columnIndex].field = { ...emptyField }
        formStructure.value.rows[rowIndex].columns[columnIndex].field!.empty = true;
        defaultField.value = { ...emptyField }
        warningDeleteField.value = false;
    }

    const editFieldMode = ref(true);

    const editField = (rowIndex: number, columnIndex: number) => {
        currentRowIndex.value = rowIndex;
        currentColumnIndex.value = columnIndex;
        editFieldMode.value = true;
        defaultField.value = formStructure.value.rows[rowIndex].columns[columnIndex].field!;
        sideFieldEditorType.value = defaultField.value.type;
    }

    const requiredRule = (v: string) => !!v || 'Field is required';

    const openSideEditor = (fieldType: FieldType) => {

        sideFieldEditorType.value = fieldType;
        sideEditorMode.value = SideEditionMode.FIELD;

        if (formStructure.value.rows.length < 1) {
            warningMissingRow.value = true;
            return
        }

        formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field!.empty = false;
        defaultField.value = formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field!
        defaultField.value.type = fieldType;

        if (defaultField.value.type === FieldType.SELECT) {
            defaultField.value.itemsString = (formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field!.items as any).join(', ');
        }
    }

    const resetFieldData = () => {
        defaultField.value = { ...emptyField }
    }

    const warningDeleteField = ref(false);
    const warningDeleteRow = ref(false);
    const warningMissingRow = ref(false);

    function $reset() {
        formId.value = '';
        formTitle.value = '';
        formStructure.value = emptyFormStructure();
        form.value = emptyForm();
    }

    const newForm = () => {
        router.visit('/form/create', {
            onSuccess: () => {
                $reset();
            }
        });
    }

    const sideEditorMode = ref(SideEditionMode.FORM);

    const saveForm = () => {
        if (route().current('form.create')) {
            // CREATE
            router.post('/form', {
                form_structure: JSON.stringify(formStructure.value),
                title: formTitle.value,
            });
            // UPDATE
        } else {
            router.put(`/form/${formId.value}`, {
                form_structure: JSON.stringify(formStructure.value),
                title: formTitle.value,
            });
        }
    }

    const formMode = ref(FormMode.EDIT);
    const bugologMode = ref(BugologMode.FORM);

    return {
        sideFieldEditorType,
        editFieldMode,
        openSideEditor,
        form,
        emptyForm,
        emptyField,
        formId,
        formTitle,
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
        warningMissingRow,
        $reset,
        newForm,
        sideEditorMode,
        saveForm,
        bugologMode,
        formMode,
    }
})