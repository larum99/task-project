<template>
    <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
        <div class="row w-100">
        <!-- Imagen a la izquierda -->
        <div class="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-gray-100">
            <img src="../../public/undraw_software-engineer_xv60.svg" alt="Registro" class="img-fluid" style="max-height: 400px;">
        </div>
        
        <!-- Formulario de registro -->
        <div class="col-lg-6 d-flex align-items-center justify-content-center">
            <div class="card shadow p-4 w-100" style="max-width: 400px; border: none; border-radius: 1rem;">
            <h2 class="text-center mb-4 text-primary">Registro</h2>
            <div class="mb-3">
                <input type="email" v-model="email" class="form-control" placeholder="Correo electrónico" required>
            </div>
            <div class="mb-3">
                <input type="password" v-model="password" class="form-control" placeholder="Contraseña" required>
            </div>
            <button @click="registerWithEmail" class="btn btn-primary w-100 mb-3">Registrarse</button>

            <button @click="registerWithGoogle" class="btn btn-outline-primary w-100 mb-3">
                <i class="bi bi-google me-2"></i>Registrarse con Google
            </button>

            <p v-if="errorMsg" class="text-danger text-center">{{ errorMsg }}</p>  
            <p class="text-center">¿Ya tienes cuenta? 
                <router-link to="/login" class="text-primary text-decoration-none">Inicia sesión</router-link>
            </p>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth, googleProvider } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const router = useRouter();

const registerWithEmail = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        router.push('/tasks');
    } catch (error) {
        errorMsg.value = 'Error al registrarse.';
        console.error(error);
    }
};

const registerWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google registration success:', result.user);
        router.push('/tasks');
    } catch (error) {
        errorMsg.value = 'Error al registrarse con Google.';
        console.error(error);
    }
};
</script>

<style scoped>
.card {
    border: none;
    border-radius: 1rem;
}
</style>
