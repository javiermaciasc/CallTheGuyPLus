// Verificar sesión
const token = localStorage.getItem("token");
if (!token) window.location.href = "inicio.html";

const API = "http://localhost:3000/api/stores";

// Cargar tiendas
async function loadStores() {
    try {
        const res = await fetch(API, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();
        renderStores(data);

    } catch (err) {
        console.error("Error cargando tiendas:", err);
    }
}

function renderStores(stores) {
    const box = document.getElementById("storesList");
    box.innerHTML = "";

    if (!stores || stores.length === 0) {
        box.innerHTML = "<p>No hay tiendas registradas.</p>";
        return;
    }

    stores.forEach(s => {
        box.innerHTML += `
            <div class="store-item">
                <p><strong>ID:</strong> ${s.id}</p>
                <p><strong>Nombre:</strong> ${s.name}</p>
                <button onclick="editStore('${s.id}')">Editar</button>
                <button onclick="deleteStore('${s.id}')">Eliminar</button>
            </div>
        `;
    });
}

// Crear tienda
async function createStore() {
    const name = document.getElementById("storeName").value.trim();
    if (!name) return;

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name })
    });

    loadStores();
}

// Editar tienda
async function editStore(id) {
    const newName = prompt("Nuevo nombre:");
    if (!newName) return;

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: newName })
    });

    loadStores();
}

// Eliminar tienda
async function deleteStore(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });

    loadStores();
}

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "inicio.html";
}

// Inicial
loadStores();
