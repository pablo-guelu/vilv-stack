<template>

    <v-container class="h-100 pa-0" fluid>

        <v-row class="h-100">
            <v-col md="3">
                <v-sheet class="pt-16 px-4 h-100 border-e-sm" color="">
                    <v-row class="w-100 mt-6" no-gutters>
                        <v-col class="w-100">
                            <div class="mb-10">
                                <AddRow :cols-number="1" draggable="true" :id="'row_1'" :ondragstart="dragRowStartHandler" :ondragend="dragRowEndHandler" />
                                <AddRow :cols-number="2" draggable="true" :id="'row_2'" :ondragstart="dragRowStartHandler" :ondragend="dragRowEndHandler" />
                            </div>
                            <template v-for="type in fieldTypes" :key="type">
                                <AddFieldFrame :fieldType="type" draggable="true" :id="`${type}_field`" class="field_type_draggable"
                                    :ondragstart="dragStartHandler" :ondragend="dragEndHandler" />
                            </template>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>

            <v-col cols="6">
                <FormCanvas />
            </v-col>

            <v-col cols="3">
                <v-sheet class="pt-6 h-100 border-s-sm">
                    <v-tabs v-model="sideEditorMode" align-tabs="center">
                        <v-tab :value="SideEditionMode.FORM">Form</v-tab>
                        <v-tab :value="SideEditionMode.FIELD">Field</v-tab>
                    </v-tabs>
                    <v-tabs-window v-model="sideEditorMode">
                        <v-tabs-window-item :key="SideEditionMode.FORM" :value="SideEditionMode.FORM">
                            <FormSideEditor />
                        </v-tabs-window-item>
                        <v-tabs-window-item :key="SideEditionMode.FIELD" :value="SideEditionMode.FIELD">
                            <FieldSideEditor />
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-sheet>
            </v-col>
        </v-row>

        <WarningDialog v-model="warningMissingRow" :text="'Please add a row to add a Field'" />
        <WarningDialog v-model="warningDeleteField" :text="'Are you sure you want to delete this Field?'"
            :warning-type="'info'" :action="() => deleteField(currentRowIndex, currentColumnIndex)" />
        <WarningDialog v-model="warningDeleteRow" :text="'Are you sure you want to delete this Row?'"
            :warning-type="'info'" :action="() => deleteRow(currentRowIndex)" />

    </v-container>

</template>

<script lang="ts" setup>
import AddRow from '@/Row/AddRow.vue';
import { useBugFormStore } from '@/Stores/bugForm';
import { storeToRefs } from 'pinia';
import WarningDialog from './Components/WarningDialog.vue';
import FieldSideEditor from './Components/FieldSideEditor.vue';
import FormSideEditor from './Components/FormSideEditor.vue';
import { FieldType, FormMode, SideEditionMode } from '@/enums';
import AddFieldFrame from '@/Components/AddFieldFrame.vue';
import FormCanvas from './FormCanvas.vue';
import { watch } from 'vue';

const bugFormStore = useBugFormStore();
const { warningMissingRow, warningDeleteField, warningDeleteRow, currentRowIndex, currentColumnIndex, sideEditorMode, formMode } = storeToRefs(bugFormStore);
const { deleteField, deleteRow } = bugFormStore;

const fieldTypes =
    [
        FieldType.TEXT,
        FieldType.HTML,
        FieldType.SELECT,
        FieldType.FILES,
        FieldType.TEXT_AREA,
        FieldType.RADIO,
    ];

const dragStartHandler = (ev: DragEvent) => {
    (ev.currentTarget as HTMLElement).classList.add('draggable_selected');
    ev.dataTransfer!.setData("type", (ev.target as HTMLElement).id.split('_')[0]); // getting the field type without 'field_'
    ev.dataTransfer!.effectAllowed = "copyMove";
}

const dragRowStartHandler = (ev: DragEvent) => {
    (ev.currentTarget as HTMLElement).classList.add('row_draggable_selected');
    ev.dataTransfer!.setData("columns", (ev.target as HTMLElement).id.split('_')[1]); // getting the field type without 'field_'
    ev.dataTransfer!.effectAllowed = "copyMove";
}

const dragEndHandler = (ev: DragEvent) => {
    (ev.currentTarget as HTMLElement).classList.remove('draggable_selected');
}

const dragRowEndHandler = (ev: DragEvent) => {
    (ev.currentTarget as HTMLElement).classList.remove('row_draggable_selected');
}

watch(formMode, ()=> {
    if(formMode.value === FormMode.PREVIEW) {
        sideEditorMode.value = SideEditionMode.FORM;
    }
})

</script>

<style>
.draggable_selected {
    border: 2px solid #4CAF50 !important;
}

.row_draggable_selected {
    border: 2px solid #9e29ec !important;
}
</style>