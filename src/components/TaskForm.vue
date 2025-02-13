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

const task = ref('');

const addTask = async () => {
    if (task.value.trim() === '') return;
    await addDoc(collection(db, 'tasks'), { text: task.value, completed: false });
    task.value = '';
};
</script>