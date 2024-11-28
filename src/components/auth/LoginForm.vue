<script setup lang="ts">
import { ref } from 'vue';
const checkbox = ref(true);

import axios, { AxiosError } from 'axios';
import { useRouter } from 'vue-router'; // Importar useRouter

// Inicializar el router
const router = useRouter();
const user = ref({
    email: '',
    password: '',
});

const error = ref<string | null>(null);

// Método para registrar usuario
const authUser = async () => {
    try {
    const response = await axios.post('http://localhost:3000/users/login', user.value);
    console.log('Usuario registrado:', response.data);

    // Redirigir a la página de inicio si la solicitud es exitosa
    router.push('/'); // Cambia la ruta según sea necesario

  } catch (err) {
    console.error('Error al iniciar sesion:', err);

    // Tipar el error como AxiosError
    const errorAxios = err as AxiosError;

    // Manejar el error en función del código de estado
    if (errorAxios.response && errorAxios.response.status === 401) {
      error.value = 'Credenciales incorrectas';
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
            <v-label class="font-weight-bold mb-1">Correo electrónico</v-label>
            <v-text-field v-model="user.email" variant="outlined" density="compact" type="email" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Contraseña</v-label>
            <v-text-field v-model="user.password" variant="outlined"  density="compact" type="password"   hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-btn @click="authUser" color="primary" size="large" block   flat>Iniciar Sesión</v-btn>
        </v-col>
    </v-row>
</template>
