<template>
  <div class="container mt-4">
    <h1 class="text-center">Gestión de Tareas</h1>
    <TaskForm></TaskForm>
    <TaskList></TaskList>
  </div>
</template>

<script setup>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
</script>

<style scoped>
h1 {
  color: var(--primary-color);
}
</style>