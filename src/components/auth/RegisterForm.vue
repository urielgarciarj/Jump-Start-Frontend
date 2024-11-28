<script setup lang="ts">
import { ref } from 'vue';
const checkbox = ref(true);
import axios, { AxiosError } from 'axios';
import { useRouter } from 'vue-router'; // Importar useRouter

// Inicializar el router
const router = useRouter();
const user = ref({
  name: '',
  lastName: '',
  password: '',
  email: '',
  role: ''
});

const error = ref<string | null>(null);

// Método para registrar usuario
const registerNewUser = async () => {
    try {
    const response = await axios.post('http://localhost:3000/users', user.value);
    console.log('Usuario registrado:', response.data);

    // Redirigir a la página de inicio si la solicitud es exitosa
    router.push('/'); // Cambia la ruta según sea necesario

  } catch (err) {
    console.error('Error al registrar el usuario:', err);

    // Tipar el error como AxiosError
    const errorAxios = err as AxiosError;

    // Manejar el error en función del código de estado
    if (errorAxios.response && errorAxios.response.status === 409) {
      error.value = 'No se puede registrar el correo porque ya existe.';
    } else {
      error.value = 'Ocurrió un error inesperado. Intenta nuevamente.';
    }
  }
};
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-alert v-if="error" type="error" dismissible>
                {{ error }}
            </v-alert>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Nombre</v-label>
            <v-text-field v-model="user.name" variant="outlined" density="compact" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Apellidos</v-label>
            <v-text-field v-model="user.lastName" variant="outlined" density="compact" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Correo electrónico</v-label>
            <v-text-field v-model="user.email" variant="outlined" density="compact" type="email" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Contraseña</v-label>
            <v-text-field v-model="user.password" variant="outlined" type="password" density="compact"  hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Ocupación</v-label>
            <v-select v-model="user.role" label="" :items="['Estudiante', 'Docente', 'Reclutador']"></v-select>
        </v-col>
        <v-col cols="12" >
            <v-btn @click="registerNewUser" color="primary" size="large" block   flat>Registrase</v-btn>
        </v-col>
    </v-row>
</template>
