<template>
    <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
        <div class="row w-100 ">
            <div class="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-gray-100">
                <img src="../../public/undraw_software-engineer_xv60.svg" alt="Ilustración de inicio de sesión"
                    class="img-fluid" style="max-height: 400px;">
            </div>

            <div class="col-lg-6 d-flex align-items-center justify-content-center">
                <div class="card border-0 shadow p-4 w-100" style="max-width: 400px;">
                    <h2 class="text-center text-primary mb-4">Iniciar sesión</h2>

                    <input type="email" v-model="email" class="form-control mb-3" placeholder="Correo electrónico" />
                    <input type="password" v-model="password" class="form-control mb-3" placeholder="Contraseña" />
                    <button @click="loginWithEmail" class="btn btn-primary w-100 mb-3">Iniciar sesión</button>

                    <button @click="loginWithGoogle" class="btn btn-outline-primary w-100 mb-3">
                        <i class="bi bi-google me-2"></i> Iniciar con Google
                    </button>

                    <p v-if="errorMsg" class="text-danger text-center">{{ errorMsg }}</p>
                    <p class="text-center">¿No tienes cuenta?
                        <router-link to="/register" class="text-primary text-decoration-none">Regístrate aquí</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth, googleProvider } from '@/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const router = useRouter();

const loginWithEmail = async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/tasks');
    } catch (error) {
        errorMsg.value = 'Error al iniciar sesión.';
        console.error(error);
    }
};

const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google login success:', result.user);
        router.push('/tasks');
    } catch (error) {
        errorMsg.value = 'Error al iniciar con Google.';
        console.error(error);
    }
};
</script>

<style scoped>
.card {
    border-radius: 1rem;
}
</style>