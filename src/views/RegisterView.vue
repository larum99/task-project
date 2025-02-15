<template>
    <div class="container mt-5">
        <h2>Registro</h2>
        <input v-model="email" type="email" class="form-control mb-2" placeholder="Correo electrónico" />
        <input v-model="password" type="password" class="form-control mb-3" placeholder="Contraseña" />
        <button class="btn btn-primary w-100 mb-3" @click="register">Registrarse</button>

        <button class="btn btn-outline-danger w-100 mb-3" @click="registerWithGoogle">
            Registrarse con Google
        </button>

        <p class="mt-2">¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth, googleProvider } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        router.push('/');
    } catch (error) {
        alert('Error al registrar: ' + error.message);
    }
};

const registerWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        router.push('/');
    } catch (error) {
        alert('Error al registrarse con Google: ' + error.message);
    }
};
</script>