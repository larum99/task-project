<template>
    <div class="register-container">
        <h2>Registro</h2>
        
        <!-- Registro con correo y contraseña -->
        <input type="email" v-model="email" placeholder="Correo electrónico" />
        <input type="password" v-model="password" placeholder="Contraseña" />
        <button @click="registerWithEmail">Registrarse</button>

        <!-- Registro/Iniciar con Google -->
        <button @click="registerWithGoogle" class="google-btn">Registrarse con Google</button>

        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        <router-link to="/login">¿Ya tienes cuenta? Inicia sesión</router-link>
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

// Registro con correo y contraseña
const registerWithEmail = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        router.push('/tasks');
    } catch (error) {
        errorMsg.value = 'Error al registrarse.';
        console.error(error);
    }
};

// Registro/Iniciar sesión con Google
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
.register-container {
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
