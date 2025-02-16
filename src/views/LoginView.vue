<template>
    <div class="login-container">
        <h2>Iniciar Sesión</h2>
        <!-- Login con correo y contraseña -->
        <input type="email" v-model="email" placeholder="Correo electrónico" />
        <input type="password" v-model="password" placeholder="Contraseña" />
        <button @click="loginWithEmail">Iniciar Sesión</button>

        <!-- Login con Google -->
        <button @click="loginWithGoogle" class="google-btn">Iniciar con Google</button>

        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        <router-link to="/register">¿No tienes cuenta? Regístrate</router-link>
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

// Iniciar sesión con correo y contraseña
const loginWithEmail = async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/tasks');
    } catch (error) {
        errorMsg.value = 'Error al iniciar sesión.';
        console.error(error);
    }
};

// Iniciar sesión con Google
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
.login-container {
    max-width: 300px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.google-btn {
    background-color: #4285F4;
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
}

.error {
    color: red;
}
</style>