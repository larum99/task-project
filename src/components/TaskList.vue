<template>
    <ul class="list-group">
        <li v-for="task in tasks" :key="task.id" class="list-group-item d-flex justify-content-between">
            <span :class="{ 'text-decoration-line-through': task.completed }">{{ task.text }}</span>
            <div>
                <button class="btn btn-sm btn-warning me-2" @click="editTask(task)">Editar</button>
                <button class="btn btn-sm btn-success me-2" @click="toggleComplete(task)">Completar</button>
                <button class="btn btn-sm btn-danger" @click="deleteTask(task.id)">Eliminar</button>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { db } from '@/firebase';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const tasks = ref([]);
const auth = getAuth();
const emit = defineEmits(['edit-task']);

const fetchTasks = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    tasks.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const toggleComplete = async (task) => {
    const taskRef = doc(db, 'tasks', task.id);
    await updateDoc(taskRef, { completed: !task.completed });
    await fetchTasks();
};

const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
    await fetchTasks();
};

const editTask = (task) => {
    emit('edit-task', task);
};

onMounted(fetchTasks);
</script>

<style scoped>
button {
    min-width: 100px;
}
.list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
