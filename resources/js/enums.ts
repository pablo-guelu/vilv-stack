export enum FieldType {
    TEXT = 'text',
    HTML = 'html',
    SELECT = 'select',
    FILES = 'files',
    TEXT_AREA = 'textarea',
}

export enum SideEditionMode {
    FORM,
    FIELD,
}

export const IconsFieldTypes = {
    [FieldType.TEXT]: 'mdi-form-textbox',
    [FieldType.HTML]: 'mdi-format-text',
    [FieldType.SELECT]: 'mdi-form-select',
    [FieldType.FILES]: 'mdi-file-upload',
    [FieldType.TEXT_AREA]: 'mdi-form-textarea',
}