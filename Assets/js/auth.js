// Firebase Configuración
const firebaseConfig = {
    apiKey: "AIzaSyBk5L8hG3GXANd0uyJUk6VxDU8PWjU5DBk",
    authDomain: "innohub-376dd.firebaseapp.com",
    projectId: "innohub-376dd",
    storageBucket: "innohub-376dd.appspot.com",
    messagingSenderId: "1022331853512",
    appId: "1:1022331853512:web:xxxxxxxxxxxxxxx" // Reemplaza con el appId real
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Registro de usuario
function register() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Usuario registrado con éxito");
        })
        .catch(error => {
            alert(error.message);
        });
}

// Inicio de sesión
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Inicio de sesión exitoso");
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            alert(error.message);
        });
}

// Cierre de sesión
function logout() {
    auth.signOut().then(() => {
        alert("Sesión cerrada");
        window.location.href = "index.html";
    });
}

// Publicación de ideas
function submitIdea() {
    const title = document.getElementById("idea-title").value;
    const description = document.getElementById("idea-description").value;
    const category = document.getElementById("idea-category").value;
    const user = auth.currentUser;
    
    if (user) {
        db.collection("ideas").add({
            title,
            description,
            category,
            user_id: user.uid,
            votes: 0,
            comments: []
        }).then(() => {
            alert("Idea publicada con éxito");
            window.location.href = "dashboard.html";
        }).catch(error => {
            alert("Error al publicar la idea: " + error.message);
        });
    } else {
        alert("Debes iniciar sesión para publicar una idea");
    }
}

// Votar una idea
function voteIdea(ideaId) {
    const ideaRef = db.collection("ideas").doc(ideaId);
    
    ideaRef.get().then(doc => {
        if (doc.exists) {
            const votes = doc.data().votes + 1;
            ideaRef.update({ votes }).then(() => {
                alert("Voto registrado");
                location.reload();
            });
        }
    });
}
