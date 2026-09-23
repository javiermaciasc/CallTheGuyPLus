// Verificar sesión
const token = localStorage.getItem("token");
if (!token) window.location.href = "inicio.html";

const API = "http://localhost:3000/api/orders";

// Cargar todas las órdenes (vista administrativa)
async function loadOrders() {
    try {
        const res = await fetch(API, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();
        renderOrders(data);

    } catch (err) {
        console.error("Error cargando órdenes:", err);
    }
}

function renderOrders(orders) {
    const box = document.getElementById("ordersList");
    box.innerHTML = "";

    if (!orders || orders.length === 0) {
        box.innerHTML = "<p>No hay órdenes registradas.</p>";
        return;
    }

    orders.forEach(o => {
        box.innerHTML += `
            <div class="order-item">
                <p><strong>ID:</strong> ${o.id}</p>
                <p><strong>Cliente:</strong> ${o.clientName}</p>
                <p><strong>Servicio:</strong> ${o.serviceType}</p>
                <p><strong>Estado:</strong> ${o.status}</p>
                <button onclick="goOrder('${o.id}')">Ver</button>
            </div>
        `;
    });
}

// Ir a detalle de orden
function goOrder(id) {
    localStorage.setItem("orderId", id);
    window.location.href = "order.html";
}

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "inicio.html";
}

// Inicial
loadOrders();
