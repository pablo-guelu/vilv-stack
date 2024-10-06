import { BugologMode, FieldType, SideEditionMode } from "@/enums";
import { BugologField, Column, Form, FormStructure, Image, Row } from "@/types";
import { cleanFormStructure, validateAndFormatUrl } from "@/utils";
import { router, useForm } from "@inertiajs/vue3";
import { defineStore, storeToRefs } from "pinia";
import { computed, Ref, ref } from "vue";
import { useSettingsStore } from "./settings";
import { useGlobalStore } from "./global";


export const useBugFormStore = defineStore('bugForm', () => {

    const globalStore = useGlobalStore();
    const { AppErrors, AppSuccess, errorSnackBar, successSnackBar } = storeToRefs(globalStore);

    const sideFieldEditorType: Ref<FieldType> = ref(FieldType.TEXT);

    const formId = ref('');
    const formTitle = ref('');
    const formSlug = ref('');

    const defaultRadioOption = () => {
        return {
            id: `radioGroup-${Date.now()}`,
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

    const emptyField = (): BugologField => {
        return {
            id: '',
            name: '',
            type: FieldType.TEXT,
            label: '',
            placeholder: '',
            required: false,
            info: false,
            infoString: '',
            value: null,
            inputType: 'text',
            items: [''],
            radioGroup: [{ ...defaultRadioOption() }],
            checkboxMultiple: false,
            checkboxGroup: [{ ...defaultCheckBox() }],
            paragraph: '',
            paragraphHTML: false,
            multiple: false,
            clearable: false,
            fileInput: null,
            variant: 'outlined',
            density: 'default',
            hint: '',
            persistentHint: false,
            customAttributes: {
                class: '',
            },
            customStyle: {
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                height: 0,
                width: 0
            },
            image: {
                src: null,
                alt: '',
                path: ''
            },
            empty: true,
            number: {
                min: 0,
                max: 100,
                step: 1
            },
            result: {
                function: '() => { }',
                result: () => { }
            },
            date: {
                multiple: false,
                range: false
            },
            time: ''
        }
    }

    const defaultColumn = (): Column => {
        return {
            field: { ...emptyField() },
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
            id: '',
            variant: 'outlined',
            density: 'default',
            showTitle: true,
            defaultTheme: 'dark',
            rows: [
                defaultRow()
            ]
        }
    }

    const formStructure: Ref<FormStructure> = ref({
        id: formId.value,
        variant: 'outlined',
        density: 'default',
        showTitle: true,
        defaultTheme: 'dark',
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

    const deleteField = (rowIndex: number, columnIndex: number) => {
        formStructure.value.rows[rowIndex].columns[columnIndex].field = { ...emptyField() }
        formStructure.value.rows[rowIndex].columns[columnIndex].field!.empty = true;
        warningDeleteField.value = false;
    }

    const editFieldMode = ref(true);

    const editField = (rowIndex: number, columnIndex: number) => {
        currentRowIndex.value = rowIndex;
        currentColumnIndex.value = columnIndex;
        editFieldMode.value = true;
    }

    const requiredRule = (v: string) => !!v || 'Field is required';

    const openSideEditor = (fieldType: FieldType) => {

        if (formStructure.value.rows.length < 1) {
            warningMissingRow.value = true;
            return
        }

        formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field!.empty = false;
        formStructure.value.rows[currentRowIndex.value].columns[currentColumnIndex.value].field!.type = fieldType;

        sideFieldEditorType.value = fieldType;
        sideEditorMode.value = SideEditionMode.FIELD;
    }

    const resetFieldData = (field: BugologField) => {
        field = { ...emptyField() }
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

    const settingsStore = useSettingsStore();
    const { redirectUrl, afterSubmittingMessage, recipients, ccs } = storeToRefs(settingsStore);

    const images: Ref<Image[]> = ref([]);

    const saveForm = () => {

        const cleanStructure = cleanFormStructure(formStructure.value);

        const form = useForm({
            form_structure: JSON.stringify(cleanStructure),
            title: formTitle.value,
            slug: formSlug.value,
            settings: JSON.stringify({
                redirect_url: validateAndFormatUrl(redirectUrl.value),
                after_submitting_message: afterSubmittingMessage.value,
                recipients: recipients.value,
                ccs: ccs.value
            }),
            images: images.value.map(image => image.src) // Map to image sources
        })

        let formData = new FormData();
        formData.append('form_structure', JSON.stringify(cleanStructure));
        formData.append('title', formTitle.value);
        formData.append('slug', formSlug.value);
        formData.append('settings', JSON.stringify({
            redirect_url: validateAndFormatUrl(redirectUrl.value),
            after_submitting_message: afterSubmittingMessage.value,
            recipients: recipients.value,
            ccs: ccs.value
        }));

        images.value.forEach((image, index) => {
            if (image.src) {
                formData.append(`images[${index}]`, image.src as File);
            }
        });

        console.log(formData);

        const onSuccess = () => {
            AppSuccess.value = ['Form saved successfully'];
            successSnackBar.value = true;
        };

        const onError = (errors: any) => {
            errorSnackBar.value = true;
            AppErrors.value = Object.values(errors).flat() as string[];
            console.log(errors.value);
        };

        if (route().current('form.create')) {
            // CREATE
            router.post('/form', formData, { onSuccess, onError });
        } else {
            // UPDATE
            router.post(`/form/${formId.value}`, {
                _method: 'put',
                title: form.title,
                slug: form.slug,
                form_structure: form.form_structure,
                settings: form.settings,
                images: form.images
            }, { onSuccess, onError });
        }
    }

    const bugologMode = ref(BugologMode.FORM);


    const exportForm = () => {
        const cleanStructure = cleanFormStructure(formStructure.value);

        const formData = {
            title: formTitle.value,
            structure: cleanStructure
        };

        const jsonString = JSON.stringify(formData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${formTitle.value || 'form'}.json`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    const importForm = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const jsonString = e.target?.result as string;
                    const formData = JSON.parse(jsonString);
                    formStructure.value = formData.structure;
                    formTitle.value = formData.title;
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    const formToValidate = ref();


    const publishForm = () => {

        const cleanStructure = cleanFormStructure(formStructure.value);

        router.post('/publish', {
            form_structure: JSON.stringify(cleanStructure),
            form_id: formId.value,
            title: formTitle.value,
            slug: formSlug.value,
            settings: {
                redirect_url: validateAndFormatUrl(redirectUrl.value),
                after_submitting_message: afterSubmittingMessage.value,
                recipients: recipients.value,
                ccs: ccs.value
            }
        },
            {
                onSuccess: () => {
                    AppSuccess.value = ['Form published successfully'];
                    successSnackBar.value = true;
                },
                onError: (errors) => {
                    errorSnackBar.value = true;
                    AppErrors.value = Object.values(errors).flat();
                    console.log(errors.value);
                },
            }
        );
    };

    const deleteFormDialog = ref(false);

    const parseFormStructureData = (formStructure: FormStructure) => {
        const relevantFields: FieldType[] = [FieldType.TEXT, FieldType.TEXT_AREA, FieldType.SELECT, FieldType.RADIO, FieldType.CHECKBOX];

        const result: Record<string, any> = {};

        formStructure.rows.forEach(row => {
            row.columns.forEach(column => {
                const field = column.field;
                if (field && relevantFields.includes(field.type)) {
                    const key = field.label || field.name || field.id || field.type;
                    if (key) {
                        switch (field.type) {
                            case FieldType.RADIO:
                                result[key] = field.radioGroup?.find(option => option.value)?.value || '';
                                break;
                            case FieldType.CHECKBOX:
                                if (field.checkboxMultiple) {
                                    result[key] = field.checkboxGroup?.filter(option => option.value).map(option => option.label) || [];
                                } else {
                                    result[key] = field.value || false;
                                }
                                break;
                            case FieldType.SELECT:
                                result[key] = field.multiple ? field.items?.filter(item => item) : (field.value || '');
                                break;
                            default:
                                result[key] = field.value || '';
                        }
                    }
                }
            });
        });

        return result;
    };

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
        formSlug,
        addRow,
        deleteRow,
        // addField,
        // updateField,
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
        defaultRadioOption,
        defaultCheckBox,
        exportForm,
        importForm,
        publishForm,
        deleteFormDialog,
        images,
        parseFormStructureData,
        formToValidate
    }
})