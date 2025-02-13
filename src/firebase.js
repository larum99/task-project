// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB93cezc7tcxqJlrV37dijXVSuJqgQ9bBM",
    authDomain: "task-project-f38cd.firebaseapp.com",
    projectId: "task-project-f38cd",
    storageBucket: "task-project-f38cd.firebasestorage.app",
    messagingSenderId: "257554058405",
    appId: "1:257554058405:web:477133ca6dee8f8479514c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
