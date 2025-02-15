<template>
    <div class="container mt-5">
        <h2>Iniciar Sesión</h2>
        <input v-model="email" type="email" class="form-control mb-2" placeholder="Correo electrónico" />
        <input v-model="password" type="password" class="form-control mb-3" placeholder="Contraseña" />
        <button class="btn btn-success w-100 mb-3" @click="login">Iniciar sesión</button>

        <button class="btn btn-outline-primary w-100 mb-3" @click="loginWithGoogle">
            Iniciar sesión con Google
        </button>

        <p class="mt-2">¿No tienes cuenta? <router-link to="/register">Regístrate</router-link></p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth, googleProvider } from '@/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/');
    } catch (error) {
        alert('Error al iniciar sesión: ' + error.message);
    }
};

const loginWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        router.push('/');
    } catch (error) {
        alert('Error al iniciar sesión con Google: ' + error.message);
    }
};
</script>