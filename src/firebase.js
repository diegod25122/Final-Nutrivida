// Firebase core
import { initializeApp } from "firebase/app";

// Firebase Auth & Firestore
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración REAL de tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyCMN5OCjcFWoVySxjiT7X4RjZQjKjzZcm0",
  authDomain: "nutrivida-c5019.firebaseapp.com",
  projectId: "nutrivida-c5019",
  storageBucket: "nutrivida-c5019.firebasestorage.app",
  messagingSenderId: "575709797461",
  appId: "1:575709797461:web:a56a12783fbbbea45288dc",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
