<template>
  <div class="container mt-4">
    <nav class="mb-3 d-flex justify-content-between">
      <h1 class="text-center">Gestión de Tareas</h1>
      <button v-if="user" class="btn btn-danger" @click="logout">Cerrar Sesión</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '@/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const user = ref(null);

const logout = async () => {
  await signOut(auth);
};

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });
});
</script>
