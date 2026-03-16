import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbe9GJygUvifFY6MR8N8m-sJh8ceGWOLU",
  authDomain: "barbearia-premium-demo.firebaseapp.com",
  projectId: "barbearia-premium-demo",
  storageBucket: "barbearia-premium-demo.firebasestorage.app",
  messagingSenderId: "972303217678",
  appId: "1:972303217678:web:c3204ee2201bfed1e6785f"
};
// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Inicializar e exportar serviços
export const db = getFirestore(app);
export const auth = getAuth(app);
