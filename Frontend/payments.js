// Verificar sesión
const token = localStorage.getItem("token");
if (!token) window.location.href = "inicio.html";

const API = "http://localhost:3000/api/payments";

// Cargar pagos
async function loadPayments() {
    try {
        const res = await fetch(API, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();
        renderPayments(data);

    } catch (err) {
        console.error("Error cargando pagos:", err);
    }
}

function renderPayments(payments) {
    const box = document.getElementById("paymentsList");
    box.innerHTML = "";

    if (!payments || payments.length === 0) {
        box.innerHTML = "<p>No hay pagos registrados.</p>";
        return;
    }

    payments.forEach(p => {
        box.innerHTML += `
            <div class="payment-item">
                <p><strong>ID Pago:</strong> ${p.id}</p>
                <p><strong>Orden:</strong> ${p.orderId}</p>
                <p><strong>Monto:</strong> $${p.amount}</p>
                <p><strong>Estado:</strong> ${p.status}</p>
            </div>
        `;
    });
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "inicio.html";
}

// Inicial
loadPayments();
