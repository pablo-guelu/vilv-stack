export enum FieldType {
    TEXT = 'Text',
    HTML = 'HTML',
    SELECT = 'Select',
    FILES = 'Files',
    TEXT_AREA = 'Textarea',
    RADIO = 'Radio',
    CHECKBOX = 'Checkbox',
    PARAGRAPH = 'Info Paragraph',
}

export enum SideEditionMode {
    FORM,
    FIELD,
}

export enum BugologMode {
    FORM,
    INFO
}

export enum FormMode {
    EDIT,
    PREVIEW
}

export const IconsFieldTypes = {
    [FieldType.TEXT]: 'mdi-form-textbox',
    [FieldType.HTML]: 'mdi-format-text',
    [FieldType.SELECT]: 'mdi-form-select',
    [FieldType.FILES]: 'mdi-file-upload',
    [FieldType.TEXT_AREA]: 'mdi-form-textarea',
    [FieldType.RADIO]: 'mdi-radiobox-marked',
    [FieldType.CHECKBOX]: 'mdi-checkbox-intermediate',
    [FieldType.PARAGRAPH]: 'mdi-card-text-outline'
}