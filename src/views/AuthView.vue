<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const email = ref('');
const password = ref('');
const auth = getAuth();

const loginWithEmail = async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        alert('Inicio de sesión exitoso');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
};

const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        alert('Inicio de sesión con Google exitoso');
    } catch (error) {
        console.error('Error al iniciar sesión con Google:', error);
    }
};
</script>

<template>
    <div class="auth-container">
        <h3>Iniciar sesión</h3>
        <input type="email" v-model="email" placeholder="Correo electrónico" />
        <input type="password" v-model="password" placeholder="Contraseña" />
        <button @click="loginWithEmail" class="btn btn-primary">Iniciar sesión</button>
        <button @click="loginWithGoogle" class="btn btn-danger">Iniciar sesión con Google</button>
    </div>
</template>

<style scoped>
.auth-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
    margin: auto;
}
</style>
