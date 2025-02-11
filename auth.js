// auth.js - Manejo de autenticación con Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBk5L8hG3GXANd0uyJUk6VxDU8PWjU5DBk",
    authDomain: "innohub-376dd.firebaseapp.com",
    projectId: "innohub-376dd",
    storageBucket: "innohub-376dd.appspot.com",
    messagingSenderId: "1022331853512",
    appId: "1:1022331853512:web:xxxxxxxxxxxxxxx"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Registro de usuario
document.getElementById("register-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const alertMessage = document.getElementById("alert-message");

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            points: 0
        });
        
        alertMessage.innerHTML = '<div class="alert alert-success">Usuario registrado con éxito.</div>';
        setTimeout(() => window.location.href = "login.html", 2000);
    } catch (error) {
        alertMessage.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
    }
});

// Inicio de sesión
document.getElementById("login-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const alertMessage = document.getElementById("alert-message");

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        alertMessage.innerHTML = '<div class="alert alert-success">Inicio de sesión exitoso.</div>';
        setTimeout(() => window.location.href = "dashboard.html", 2000);
    } catch (error) {
        alertMessage.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
    }
});

// Cierre de sesión
document.getElementById("logout-btn")?.addEventListener("click", async () => {
    try {
        await signOut(auth);
        alert("Sesión cerrada con éxito.");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error al cerrar sesión: ", error);
    }
});
