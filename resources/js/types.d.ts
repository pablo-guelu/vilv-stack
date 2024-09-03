import { FieldType } from '@/enums';

export interface User {
    id?: string;
    name?: string;
    email?: string;
}


export interface Radio {
    id: string | number;
    value: string;
    label: string;
}

export interface Checkbox {
    id: string | number;
    value: string;
    label: string;
}
export interface BugologField {
    id: string;
    type: FieldType;
    label: string;
    placeholder: string;
    required: boolean;
    value: string | string[];
    info?: boolean;
    infoString?: string;
    inputType?: string;
    items?: any[],
    itemsString?: string,
    radioGroup?: Radio[],
    checkboxMultiple?: false,
    checkboxGroup?: Checkbox[],
    multiple?: boolean,
    clearable?: boolean,
    fileInput?: File | File[] | null | undefined,
    variant: "filled" | "underlined" | "outlined" | "plain" | "solo" | "solo-inverted" | "solo-filled",
    empty?: boolean;
}

export interface Paragraph{
    text: string;
    cardBgColor?: string;
    textColor?: string;
    elevation?: number;
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
    variant: "filled" | "underlined" | "outlined" | "plain" | "solo" | "solo-inverted" | "solo-filled"; 
    rows: Row[];
}

export interface Row {
    colsNumber: number;
    columns: Column[];
}

export interface Column {
    field?: undefined | BugologField;
    paragraph?: Paragraph;
}

export interface Form {
    id: string;
    title: string;
    form_structure: FormStructure;
}
