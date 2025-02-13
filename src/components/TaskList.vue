<template>
    <ul class="list-group">
        <li v-for="task in tasks" :key="task.id" class="list-group-item d-flex justify-content-between">
            <span :class="{ 'text-decoration-line-through': task.completed }">{{ task.text }}</span>
            <div>
                <button class="btn btn-sm btn-success me-2" @click="toggleComplete(task)">✓</button>
                <button class="btn btn-sm btn-danger" @click="deleteTask(task.id)">🗑️</button>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const tasks = ref([]);

const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    tasks.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const toggleComplete = async (task) => {
    const taskRef = doc(db, 'tasks', task.id);
    await updateDoc(taskRef, { completed: !task.completed });
    fetchTasks();
};

const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
    fetchTasks();
};

onMounted(fetchTasks);
</script>