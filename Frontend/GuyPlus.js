// Verificar sesión
const token = localStorage.getItem("token");
if (!token) window.location.href = "inicio.html";

// Navegación del módulo GuyPlus
function goMatching() {
    window.location.href = "matching.html";
}

function goProgreso() {
    window.location.href = "progreso.html";
}

function goHistorial() {
    window.location.href = "historial.html";
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "inicio.html";
}
