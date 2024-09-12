import { FormStructure, Row, Column } from '@/types';

const removeValueFromField = (field: any) => {
    const { value, ...fieldWithoutValue } = field;
    return fieldWithoutValue;
}

export const cleanFormStructure = (formStructure: FormStructure): FormStructure => {
    const cleanStructure = JSON.parse(JSON.stringify(formStructure));

    cleanStructure.rows = cleanStructure.rows.map((row: Row) => ({
        ...row,
        columns: row.columns.map((column: Column) => ({
            ...column,
            field: removeValueFromField(column.field)
        }))
    }));

    return cleanStructure;
};

export const validateAndFormatUrl = (url: string): string => {
    // Regular expression to check if the string starts with http:// or https://
    const hasProtocol = /^https?:\/\//i.test(url);
    if (hasProtocol) {
        return url; // URL is already valid, return as is
    }
    // Regular expression to check if the string contains a domain extension
    const hasDomain = /\.[a-z]{2,}$/i.test(url);
    if (hasDomain) {
        return `https://${url}`; // Add https:// to the beginning
    }
    return url; // Return original string if it's not a URL
};


