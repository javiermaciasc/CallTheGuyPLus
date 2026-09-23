// Verificar sesión
const token = localStorage.getItem("token");
if (!token) window.location.href = "inicio.html";

const API = "http://localhost:3000/api/uploads";

// Cargar lista de archivos
async function loadUploads() {
    try {
        const res = await fetch(API, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();
        renderUploads(data);

    } catch (err) {
        console.error("Error cargando uploads:", err);
    }
}

function renderUploads(files) {
    const box = document.getElementById("uploadsList");
    box.innerHTML = "";

    if (!files || files.length === 0) {
        box.innerHTML = "<p>No hay archivos subidos.</p>";
        return;
    }

    files.forEach(f => {
        box.innerHTML += `
            <div class="upload-item">
                <p><strong>ID:</strong> ${f.id}</p>
                <p><strong>Nombre:</strong> ${f.filename}</p>
                <button onclick="downloadFile('${f.filename}')">Descargar</button>
                <button onclick="deleteFile('${f.id}')">Eliminar</button>
            </div>
        `;
    });
}

// Subir archivo
async function uploadFile() {
    const file = document.getElementById("fileInput").files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch(API, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
    });

    loadUploads();
}

// Descargar archivo
function downloadFile(filename) {
    window.location.href = `${API}/download/${filename}`;
}

// Eliminar archivo
async function deleteFile(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });

    loadUploads();
}

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "inicio.html";
}

// Inicial
loadUploads();
