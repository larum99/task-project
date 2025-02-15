<template>
    <div class="mb-3">
        <input type="text" v-model="task" class="form-control" placeholder="Nueva tarea">
        <button class="btn btn-primary mt-2" @click="addTask">Agregar</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const task = ref('');

const addTask = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        console.error('Usuario no autenticado');
        alert('Debes iniciar sesión para agregar tareas.');
        return;
    }

    if (task.value.trim() === '') return;

    try {
        await addDoc(collection(db, 'tasks'), {
            text: task.value,
            completed: false,
            userId: user.uid
        });
        console.log('Tarea añadida con éxito');
        task.value = '';
    } catch (error) {
        console.error('Error al agregar tarea:', error);
    }
};

</script>