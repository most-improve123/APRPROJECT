// script.js
// Verifica el estado de autenticación al cargar la página
auth.onAuthStateChanged((user) => {
  if (user) {
    localStorage.setItem("loggedIn", "true");
  } else {
    localStorage.removeItem("loggedIn");
  }
});

// -------------------- LOGIN --------------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      await auth.signInWithEmailAndPassword(username, password);
      alert("Inicio de sesión exitoso");
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  });
}

// -------------------- REGISTRO --------------------
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("⚠️ Las contraseñas no coinciden");
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(username, password);
      await db.collection("users").doc(userCredential.user.uid).set({
        email: username,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      window.location.href = "index.html";
    } catch (error) {
      alert("Error al registrar: " + error.message);
    }
  });
}
