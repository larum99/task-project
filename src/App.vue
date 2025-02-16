<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const user = ref(null);


onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });
});
</script>
