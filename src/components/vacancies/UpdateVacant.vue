<script setup lang="ts">
import { ref } from 'vue';
import axios, { AxiosError } from 'axios';
import { defineProps, defineEmits } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import EditorMenubar from '@/components/plugins/editor/EditorMenubar.vue';
import StarterKit from '@tiptap/starter-kit';

const props = defineProps({
    vacant: Object, // Recibe la vacante que se va a editar
});
const emit = defineEmits(['updateVacant', 'cancelEdit']); // Emitir eventos para actualizar o cancelar la edición

const updateName = ref(props.vacant?.name || '');
const updateStatus = ref(props.vacant?.status || '');
const updateLocation = ref(props.vacant?.location || '');
const updateCategory = ref(props.vacant?.category || '');
const updateModality = ref(props.vacant?.modality || '');
const updateLevel = ref(props.vacant?.level || '');
const updateSalary = ref(props.vacant?.salary || '');
const updateSalaryPeriod = ref(props.vacant?.salaryPeriod || '');

const modalityOps = ['Presencial', 'Remoto', 'Hibrido'];
const salaryPeriodOps = ['Semanal', 'Quincenal', 'Mensual'];
const statusOps = ['activo', 'inactivo'];
const editor = useEditor({
    extensions: [StarterKit],
    content: props.vacant?.description
});

const valid = ref(false);
const error = ref<string | null>(null);
const notEmptyRule = [
  (value: string) => !!value || 'Este campo es obligatorio.'
];

// Función para cancelar la edición
const cancelEdit = () => {
  emit('cancelEdit');
};

const submitVacant = async () => {
    if (valid.value) {
        try {
            if (editor.value && editor.value.getHTML() != '' && editor.value.getHTML() != '<p></p>') {

                const vacantData = {
                    name: updateName.value,
                    description: editor.value.getHTML(),
                    status: updateStatus.value,
                    location: updateLocation.value,
                    category: updateCategory.value,
                    modality: updateModality.value,
                    level: updateLevel.value,
                    salary: updateSalary.value,
                    salaryPeriod: updateSalaryPeriod.value
                }
                const response = await axios.put(`http://localhost:3000/vacancies/update/${props.vacant?.id}`, vacantData);
                //console.log('vacant updated:', response.data);
                // Emitir evento para actualizar el post en el componente principal
                emit('updateVacant', {...props.vacant,...response.data,});
            }
            else {
                error.value = 'Es obligatorio agregar una descripción.';
            }
        } catch (err) {
            console.error('Error:', err);
            const errorAxios = err as AxiosError;
            // Manejar el error en función del código de estado
            if (errorAxios.response) {
                error.value = 'Ocurrió un error inesperado. Intenta nuevamente.';
            }
        }
    }
};

</script>

<template>
     <v-col cols="12">
        <v-alert v-if="error" type="error" variant="tonal" dismissible>
            {{ error }}
        </v-alert>
    </v-col>
    <v-form v-model="valid">
        <div class="bg-light mt-6 pa-6 rounded-md">
            <v-row>
                <v-col cols="12" md="3">
                    <v-label class="font-weight-semibold pb-2">Título</v-label>
                    <v-text-field v-model="updateName" :rules="notEmptyRule" required />
                </v-col>
                <v-col cols="12" md="3">
                    <v-label class="font-weight-semibold pb-2">Categoría</v-label>
                    <v-text-field v-model="updateCategory" :rules="notEmptyRule" required />
                </v-col>
                <v-col cols="12" md="3">
                    <v-label class="font-weight-semibold pb-2">Modalidad</v-label>
                    <v-select v-model="updateModality" :items="modalityOps" :rules="notEmptyRule" required />
                </v-col>
                <v-col cols="12" md="3">
                    <v-label class="font-weight-semibold pb-2">Estado</v-label>
                    <v-select v-model="updateStatus" :items="statusOps" :rules="notEmptyRule" required />
                </v-col>

                <v-col cols="12" md="4">
                    <v-label class="font-weight-semibold pb-2">Ubicación</v-label>
                    <v-text-field v-model="updateLocation" />
                </v-col>
                <v-col cols="12" md="4">
                    <v-label class="font-weight-semibold pb-2">Nivel</v-label>
                    <v-text-field v-model="updateLevel" :rules="notEmptyRule" required />
                </v-col>
                <v-col cols="12" md="2">
                    <v-label class="font-weight-semibold pb-2">Salario</v-label>
                    <v-text-field v-model="updateSalary" type="number"  min="0"/>
                </v-col>
                <v-col cols="12" md="2">
                    <v-label class="font-weight-semibold pb-2">Periodo</v-label>
                    <v-select v-model="updateSalaryPeriod" :items="salaryPeriodOps" />
                </v-col>

                <!-- Description text editor -->
                <v-col cols="12">
                    <v-label class="font-weight-semibold pb-2">Descripción</v-label>
                    <v-card variant="outlined">
                        <div v-if="editor">
                            <EditorMenubar :editor="editor" />
                        </div>
                        <editor-content :editor="editor" />
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <div class="d-flex align-center justify-end ga-3">
            <v-btn @click="cancelEdit" flat variant="tonal" class="mt-6">Cancelar</v-btn>
            <v-btn @click="submitVacant" :disabled="!valid" flat color="primary" class="mt-6">Guardar</v-btn>
        </div>
    </v-form>
</template>