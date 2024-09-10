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

