<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const tasks = ref([]);

const fetchTasks = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        tasks.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
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

