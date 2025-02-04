<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import UpdateVacantForm from './UpdateVacant.vue';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const userId = authStore.userId;

const vacantId = route.params.id;

const page = ref({ title: 'Detalles de Oferta Laboral' });
const breadcrumbs = ref([
    { text: 'Dashboard', disabled: false, href: '#' },
    { text: 'Detalles Vacante', disabled: true, href: '#' }
]);

const vacantDetail = ref<any | null>(null);
const applicationsList = ref<any | null>(null);

const error = ref<string | null>(null);
const tab = ref(null);

const showEditForm = ref(false);
const showConfirmation = ref(false);

/*Header Data [Table headers and sorting]*/
const sortBy:any  = ref([
    { key: 'name', order: 'desc' }
]);
const headers : any = ref([
    { title: 'Nombre', align: 'start', key: 'name' },
    { title: 'Correo', align: 'start', key: 'email' },
    { title: 'Número Cel.', align: 'start', key: 'phoneNumber' },
    { title: 'Fecha', align: 'start', key: 'dateCreated' },
    { title: 'Interes', align: 'start', key: 'interested', sortable: false },
    { title: 'Habilidades', align: 'start', key: 'proficiency', sortable: false },
]);

onMounted(async () => {
    try {
        const response = await axios.get(`http://localhost:3000/vacancies/vacant/detail/${vacantId}`);
        console.log('response data', response.data);
        // If no response data or the rcd belongs to other user, throw error
        if (!response.data || response.data.user.id != userId) {
            error.value = 'Oferta laboral no encontrada.';
        } 
        else { // The vacant belong to the currUser, proceed to get applications 
            vacantDetail.value = response.data;
            // Get applications related
            const _response = await axios.get(`http://localhost:3000/applications/list-by/vancant/${vacantId}`);
            console.log('Get appl list', _response.data);
            applicationsList.value = _response.data;
        }
    } catch (err) {
        console.error('Error:', err);
        const errorAxios = err as AxiosError;
        // Manejar el error en función del código de estado
        if (errorAxios.response) {
            error.value = 'Ocurrió un error inesperado. Intenta nuevamente.';
        }
    }
});

// Función para editar el post
const editPost = () => {
  showEditForm.value = true;
};

// Función para cancelar la edición
const cancelEdit = () => {
  showEditForm.value = false;
};

// Función para manejar la actualización de la vacante
const handleUpdateVacant = (updatedVacant: 
    { name: any; description: any; status: any; location: any; category: any; modality: any; level: any; salary: any; salaryPeriod: any; }) => {
    if (vacantDetail.value) {
        vacantDetail.value.name = updatedVacant.name;
        vacantDetail.value.description = updatedVacant.description;
        vacantDetail.value.status = updatedVacant.status;
        vacantDetail.value.location = updatedVacant.location;
        vacantDetail.value.category = updatedVacant.category;
        vacantDetail.value.modality = updatedVacant.modality;
        vacantDetail.value.level = updatedVacant.level;
        vacantDetail.value.salary = updatedVacant.salary;
        vacantDetail.value.salaryPeriod = updatedVacant.salaryPeriod;
    }
  showEditForm.value = false;
};

//Funcion para manejar eliminar una vacante
const handleDeleteVacant = () => { 
    showConfirmation.value = true; 
};

const confirmDelete = async () => {
    try {
        await axios.delete(`http://localhost:3000/vacancies/delete/${vacantId}`);
        router.push('/vacancies/list-all');
        //emit('deletePost', postIdToDelete.value);
    } catch (err) {
        console.log('Error', err);
    }
    showConfirmation.value = false;
};

const formatDateTime = (date: string) => {
  if (!date) return '';
  return new Date(date).toLocaleString('es-ES', {
    day: 'numeric',    // Día
    month: 'numeric',  // Mes
    year: 'numeric',   // Año
  });
};
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <!-- Tabs para detalle - solicitudes -->
        <v-card-item>
            <v-tabs v-model="tab" color="primary" class="border-bottom">
                <v-tab value="one">General</v-tab>
                <v-tab value="two">Solicitudes</v-tab>
            </v-tabs>
            <div class="mt-5">
                <v-row v-if="error">
                    <v-col cols="12">
                        <v-alert v-if="error" type="error" variant="tonal" dismissible>
                            {{ error }}
                        </v-alert>
                    </v-col>
                </v-row>
                <v-window v-model="tab" v-if="!error">
                    <v-window-item value="one">
                        <!-- Only view -->
                        <div v-if="!showEditForm" class="bg-light mt-6 pa-6 rounded-md">
                            <v-row>
                                <v-col cols="12" md="12">
                                    <h3>{{ vacantDetail?.company }}</h3>
                                    <span class="text-subtitle-2 opacity-50">
                                        <CircleIcon size="8" fill="inherit" class="color-inherits mr-1" />
                                        {{ vacantDetail?.user.name }} {{ vacantDetail?.user.lastName }}
                                    </span>
                                </v-col>
                                <divider></divider>
                                <v-col cols="12" md="3">
                                    <h3>Título</h3>
                                    <span class="text-subtitle-1 opacity-50">
                                        <CircleIcon size="8" fill="inherit" class="color-inherits mr-1" />
                                        {{ vacantDetail?.name }}
                                    </span>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <h3>Categoría</h3>
                                    <span class="text-subtitle-1 opacity-50">
                                        <CircleIcon size="8" fill="inherit" class="color-inherits mr-1" />
                                        {{ vacantDetail?.category }}
                                    </span>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <h3>Modalidad</h3>
                                    <span class="text-subtitle-1 opacity-50">
                                        <CircleIcon size="8" fill="inherit" class="color-inherits mr-1" />
                                        {{ vacantDetail?.modality }}
                                    </span>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <h3>Estado</h3>
                                    <span class="text-subtitle-1 opacity-50">
                                        <CircleIcon size="8" fill="inherit" class="color-inherits mr-1" />
                                        {{ vacantDetail?.status }}
                                    </span>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <h3>Ubicación</h3>
                                    <span class="text-subtitle-1 opacity-50">
                                        <CircleIcon size="8" fill="inherit" class="color-inherits mr-1" />
                                        {{ vacantDetail?.location }}
                                    </span>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <h3>Nivel</h3>
                                    <span class="text-subtitle-1 opacity-50">
                                        <CircleIcon size="8" fill="inherit" class="color-inherits mr-1" />
                                        {{ vacantDetail?.level }}
                                    </span>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <h3>Salario</h3>
                                    <span class="text-subtitle-1 opacity-50">
                                        <CircleIcon size="8" fill="inherit" class="color-inherits mr-1" />
                                        {{ vacantDetail?.salary }} {{ vacantDetail?.salaryPeriod }}
                                    </span>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <h3>Descripción</h3>
                                    <div v-html="vacantDetail?.description"></div>
                                </v-col>
                            </v-row>
                        </div>
                        <!-- Botones para editar - eliminar -->
                        <div v-if="!showEditForm" class="d-flex ga-3 justify-end mt-6">
                            <v-btn @click.stop="handleDeleteVacant()" color="error" flat >
                                Eliminar
                            </v-btn>
                            <v-btn  @click.stop="editPost()" color="primary" flat
                                >Editar</v-btn
                            >
                        </div>

                        <!-- Editing form -->
                        <div v-if="showEditForm">
                            <UpdateVacantForm
                                :vacant="vacantDetail"
                                @updateVacant="handleUpdateVacant"
                                @cancelEdit="cancelEdit()"
                            />
                        </div>
                    </v-window-item>
                    <v-window-item value="two">
                        <!-- <ProductReview /> -->
                         <v-col cols="12">
                            <UiParentCard title="Solicitudes recibidas">
                                <v-data-table items-per-page="5" :headers="headers" :items="applicationsList" item-value="name"
                                    v-model:sort-by="sortBy" class="border rounded-md datatabels">
                                    <template v-slot:item="{ item }">
                                        <tr>
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.email }}</td>
                                        <td>{{ item.phoneNumber }}</td>
                                        <td>{{ formatDateTime(item.dateCreated) }}</td> <!-- Fecha formateada -->
                                        <td>{{ item.interested }}</td>
                                        <td>{{ item.proficiency }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </UiParentCard>
                         </v-col>
                    </v-window-item>
                </v-window>
            </div>
        </v-card-item>
    </v-card>

    <!-- Confirmation Dialog Delete Vacant-->
    <v-dialog v-model="showConfirmation" max-width="500px">
        <v-card>
            <v-card-title class="pa-4 bg-primary">Eliminar Oferta Laboral</v-card-title>
            <v-card-text>
                <h5 class="text-16">¿Estás seguro de que deseas eliminar esta oferta laboral?</h5>
                <h6>Al eliminar la oferta, se eliminarán también todas las solicitudes asociadas a ella de manera permanente.</h6>
            </v-card-text>
            <v-card-actions class="d-flex justify-end">
                <v-btn variant="tonal" class="px-4" @click="showConfirmation = false">Cancelar</v-btn>
                <v-btn color="error" class="px-4" variant="tonal" @click="confirmDelete">Si, Eliminar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style lang="scss"></style>
