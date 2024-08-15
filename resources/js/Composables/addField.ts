import { useBugFormStore } from '@/Stores/bugForm';
import {FieldType} from '@/enums';
import { storeToRefs } from 'pinia';

const bugFormStore = useBugFormStore();
const { addFieldDialog, addFieldDialogType } = storeToRefs(bugFormStore);

export function useAddField(fieldType: FieldType) {
    addFieldDialogType.value = fieldType;
    addFieldDialog.value = true
}