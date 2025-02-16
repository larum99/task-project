<template>
    <div>
        <TaskForm :taskToEdit="taskToEdit" @task-edited="refreshTasks" />
        <TaskList @edit-task="handleEditTask" />
        <button @click="logout" class="btn btn-secondary mt-3">Cerrar Sesión</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TaskForm from '@/components/TaskForm.vue';
import TaskList from '@/components/TaskList.vue';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const taskToEdit = ref(null);

const handleEditTask = (task) => {
    taskToEdit.value = task;
};

const refreshTasks = () => {
    taskToEdit.value = null;
};

const logout = async () => {
    await signOut(auth);
    router.push('/login');
};
</script>
