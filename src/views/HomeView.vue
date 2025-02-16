<template>
    <div class="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
        <h1 class="mb-4 fw-bold fs-3 fs-md-1">Bienvenido su Panel de Gestión de Tareas</h1>
        <div class="d-flex flex-column flex-sm-row gap-3">
            <router-link to="/login" class="btn btn-primary m-2">Iniciar Sesión</router-link>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
h1 {
    color: #333;
}
</style>