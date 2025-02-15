<template>
    <div class="container">
        <h2 class="text-center mb-4">Tareas</h2>
        <TaskForm />
        <TaskList />
    </div>
</template>

<script setup>
import TaskForm from '@/components/TaskForm.vue';
import TaskList from '@/components/TaskList.vue';
</script>