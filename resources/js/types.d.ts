import { FieldType, PlanType } from '@/enums';

export interface User {
    id?: string;
    name?: string;
    email?: string;
    company_name?: string;
    company_website?: string;
    company_logo?: File | File[] | null | undefined;
    redirect_after_submit?: boolean;
    redirect_url?: string;
    plan_type?: PlanType;
    recipients: string[];
    ccs: string[];
    afterSubmittingMessage?: string;
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
    items?: string[],
    radioGroup?: Radio[],
    checkboxMultiple?: false,
    checkboxGroup?: Checkbox[],
    paragraph?: string,
    paragraphHTML?: boolean,
    multiple?: boolean,
    clearable?: boolean,
    fileInput?: File | File[] | null | undefined,
    variant: "filled" | "underlined" | "outlined" | "plain" | "solo" | "solo-inverted" | "solo-filled",
    density: "compact" | "comfortable" | "default",
    hint?: string;
    persistentHint?: boolean;
    customAttributes?: {
        class?: string;
        name?: string;
    };

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
    id?: string;
    variant: "filled" | "underlined" | "outlined" | "plain" | "solo" | "solo-inverted" | "solo-filled";
    density: "compact" | "comfortable" | "default";
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

export interface SelectItem {
    id: string;
    label: string;
    value: string;
}
