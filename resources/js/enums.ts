export enum FieldType {
    TEXT = 'Text Input',
    HTML = 'HTML',
    SELECT = 'Select',
    FILES = 'Files',
    TEXT_AREA = 'Textarea',
    RADIO = 'Radio',
    CHECKBOX = 'Checkbox',
    PARAGRAPH = 'Paragraph',
    IMAGE = 'Image',
    NUMBER = 'Numeric',
    RESULT = 'Result',
    DATE = 'Date',
    TIME = 'Time'
}

export enum SideEditionMode {
    FORM,
    FIELD,
}

export enum BugologMode {
    FORM,
    PREVIEW,
    MESSAGE,
    PUBLISH
}

export const IconsFieldTypes = {
    [FieldType.TEXT]: 'mdi-form-textbox',
    [FieldType.HTML]: 'mdi-format-text',
    [FieldType.SELECT]: 'mdi-form-select',
    [FieldType.FILES]: 'mdi-file-upload',
    [FieldType.TEXT_AREA]: 'mdi-form-textarea',
    [FieldType.RADIO]: 'mdi-radiobox-marked',
    [FieldType.CHECKBOX]: 'mdi-checkbox-intermediate',
    [FieldType.PARAGRAPH]: 'mdi-card-text-outline',
    [FieldType.IMAGE]: 'mdi-image-area',
    [FieldType.NUMBER]: 'mdi-numeric-0-box-outline',
    [FieldType.RESULT]: 'mdi-equal',
    [FieldType.DATE]: 'mdi-calendar-range',
    [FieldType.TIME]: 'mdi-clock-outline'
}

export enum PlanType {
    FREE,
    PRO,
    ENTERPRISE
}

export enum IndexMode {
    FORMS,
    PROJECT_INFO
}