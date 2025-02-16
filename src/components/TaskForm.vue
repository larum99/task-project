<template>
    <div class="mb-3">
        <input
            type="text"
            v-model="taskText"
            class="form-control"
            placeholder="Nueva tarea o editar tarea"
        />
        <button class="btn btn-primary mt-2" @click="handleTask">
            {{ isEditing ? 'Guardar Cambios' : 'Agregar Tarea' }}
        </button>
        <button v-if="isEditing" class="btn btn-secondary mt-2 ms-2" @click="cancelEdit">Cancelar</button>
        <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { db } from '@/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const props = defineProps({
    taskToEdit: Object,
});
const emit = defineEmits(['task-edited']);

const taskText = ref('');
const taskId = ref(null);
const isEditing = ref(false);
const errorMsg = ref('');

watch(() => props.taskToEdit, (newTask) => {
    if (newTask && newTask.id) {
        taskText.value = newTask.text;
        taskId.value = newTask.id;
        isEditing.value = true;
    } else {
        resetForm();
    }
});

const handleTask = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        errorMsg.value = 'Debes estar autenticado para agregar tareas.';
        return;
    }
    if (taskText.value.trim() === '') {
        errorMsg.value = 'La tarea no puede estar vacía.';
        return;
    }

    if (isEditing.value && taskId.value) {
        const taskRef = doc(db, 'tasks', taskId.value);
        await updateDoc(taskRef, { text: taskText.value });
    } else {
        await addDoc(collection(db, 'tasks'), {
            text: taskText.value,
            completed: false,
            userId: user.uid,
            createdAt: new Date(),
        });
    }

    emit('task-edited');
    resetForm();
};

const cancelEdit = () => resetForm();

const resetForm = () => {
    taskText.value = '';
    taskId.value = null;
    isEditing.value = false;
    errorMsg.value = '';
};
</script>
