import { FieldType } from '@/enums';

export interface BugologField {
    id: string;
    type: FieldType;
    label: string;
    placeholder: string;
    required: boolean;
    value: string;
    info?: string;
    inputType?: string;
    items?: any[],
    itemsString?: string,
    multiple?: boolean,
    clearable?: boolean,
    fileInput?: File | File[] | null | undefined
}

export interface TextField {
    id?: string;
    type: FieldType.TEXT;
    label: string;
    placeholder?: string;
    required: boolean;
    inputType?: string;
    info?: string;
    value: string;
}

export interface FormStructure {
    rows: Row[];
}

export interface Row {
    colsNumber: number;
    columns: Column[];
}

export interface Column {
    field: undefined | BugologField;
}